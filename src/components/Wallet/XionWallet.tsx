import { Abstraxion } from "@burnt-labs/abstraxion";
import { useCallback, useEffect, useRef, useState } from "react";
import useWallet from "./useWallet";
import { useWalletAuthMutation } from "@/api/authService";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { useToast } from "@/hooks/useToast";
import { IApiResponse, IUserResponse } from "@/@types/types";
import { setAuthenticated } from "@/features/authSlice";
import AuthStore from "@/utils/AuthStore";
import { Button } from "../ui/button";
import AppButton from "../shared/AppButton";
import { maskAddress } from "@/utils/maskAddress";
import Loading from "../shared/Loading";

const XionWallet = () => {
  const { setShow, bech32Address, isConnected, isConnecting, logout } = useWallet();
  const [walletAuth, { isLoading }] = useWalletAuthMutation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const hasTriedAuth = useRef(false);

  const handleAuth = useCallback(async () => {
    if (!bech32Address) return;

    toast.dismiss();
    const loadingToast = toast.loading("Authenticating wallet...");

    try {
      const response: IApiResponse = await walletAuth({ walletAddress: bech32Address }).unwrap();
      toast.dismiss(loadingToast);

      if (response.status === 200) {
        const successResponse = response.data as IUserResponse;

        dispatch(setAuthenticated({
          isAuthenticated: true,
          user: {
            id: successResponse.accessToken,
            roles: successResponse.result!.role,
            walletAddress: successResponse.result!.walletAddress,
          },
        }));

        AuthStore.setAccessToken(successResponse.accessToken);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error(response.message || "Authentication failed", {
          action: <Button onClick={handleAuth} variant="outline" size="sm">Retry</Button>,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Wallet authentication failed. Please try again.", {
        action: <Button onClick={handleAuth} variant="outline" size="sm">Retry</Button>,
      });
      console.error("Wallet Auth Error:", error);
    } finally {
      setLoading(false);
    }
  }, [bech32Address, walletAuth, dispatch, toast]);

  const handleDisconnect = useCallback(() => {
    logout?.();
    AuthStore.removeAccessToken();
    dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
    setShow(false);
    setLoading(false);
    toast.success("Wallet disconnected successfully.");
  }, [dispatch, logout, setShow, toast]);

  useEffect(() => {
    if (isConnected && !isConnecting && bech32Address && !isAuthenticated && !hasTriedAuth.current) {
      hasTriedAuth.current = true;
      handleAuth();
    }

    if (!isConnected && isAuthenticated && !isConnecting) {
      handleDisconnect();
    }

    if (!isConnected && !isConnecting) {
      setLoading(false);
    }
  }, [isConnected, isConnecting, bech32Address, isAuthenticated, handleAuth, handleDisconnect]);

  const handleConnect = async () => {
    setLoading(true);
    setShow(true);
  };

  if (isConnecting || loading || isLoading) {
    return <Loading text="Loading wallet..." />;
  }

  return (
    <section>
      <AppButton
        isLoading={loading || isLoading}
        label={bech32Address ? `VIEW ACCOUNT ${maskAddress(bech32Address)}` : "CONNECT Xion Wallet"}
        onClick={handleConnect}
      />
      <Abstraxion onClose={() => { setShow(false); setLoading(false); }} />
    </section>
  );
};

export default XionWallet;



// import { Abstraxion } from "@burnt-labs/abstraxion";
// import { useCallback, useEffect, useState } from "react";
// import useWallet from "./useWallet";
// import { useWalletAuthMutation } from "@/api/authService";
// import { RootState, useAppDispatch, useAppSelector } from "@/store";
// import { useToast } from "@/hooks/useToast";
// import { IApiResponse, IUserResponse } from "@/@types/types";
// import { setAuthenticated } from "@/features/authSlice";
// import AuthStore from "@/utils/AuthStore";
// import { Button } from "../ui/button";
// import AppButton from "../shared/AppButton";
// import { maskAddress } from "@/utils/maskAddress";
// import Loading from "../shared/Loading";

// const XionWallet = () => {
//   const { setShow, bech32Address, isConnected, isConnecting ,logout} = useWallet();
//   const [walletAuth, { isLoading }] = useWalletAuthMutation();
//   const dispatch = useAppDispatch();
//   const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     if (isConnected && !isConnecting && bech32Address && !isAuthenticated) {
//       handleAuth();
//     }
  
//     if (!isConnected && isAuthenticated && !isConnecting) {
//       handleDisconnect();
//     }
  
//     if (!isConnected && !isConnecting) {
//       setLoading(false);
//     }
//   }, [isConnected, isConnecting, bech32Address, isAuthenticated]);
  
  

  
  
//   const handleConnect = async () => {
//     setLoading(true);
//     setShow(true); 
//   };

//   const handleDisconnect = () => {
//     logout?.()
//     AuthStore.removeAccessToken();
//     dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
//     setShow(false);
//     setLoading(false); 
//     toast.success("Wallet disconnected successfully.");
//   };

//   const handleAuth = useCallback(async () => {
//     if (!bech32Address) return;

//     toast.dismiss();
//     const loadingToast = toast.loading("Authenticating wallet...");

//     try {
//       const response: IApiResponse = await walletAuth({
//         walletAddress: bech32Address,
//       }).unwrap();

//       toast.dismiss(loadingToast);

//       if (response.status === 200) {
//         const successResponse = response.data as IUserResponse;
//         dispatch(
//           setAuthenticated({
//             isAuthenticated: true,
//             user: {
//               id: successResponse.accessToken,
//               roles: successResponse.result!.role,
//               walletAddress: successResponse.result!.walletAddress,
//             },
//           })
//         );
//         AuthStore.setAccessToken(successResponse.accessToken);
//         toast.success("Wallet connected successfully!");
//       } else {
//         toast.error(response.message || "Authentication failed", {
//           action: (
//             <Button onClick={handleAuth} variant="outline" size="sm">
//               Retry
//             </Button>
//           ),
//         });
//       }
//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error("Wallet authentication failed. Please try again.", {
//         action: (
//           <Button onClick={handleAuth} variant="outline" size="sm">
//             Retry
//           </Button>
//         ),
//       });
//       console.error("Wallet Auth Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [bech32Address, walletAuth, dispatch]);
  
//   if (isConnecting || loading || isLoading) {
//     return <Loading text="Loading wallet..."/>; 
//   }

//   return (
//     <section>
//       <AppButton
//         isLoading={loading || isLoading}
//         label={
//           bech32Address
//             ? `VIEW ACCOUNT ${maskAddress(bech32Address)}`
//             : "CONNECT Xion Wallet"
//         }
//         onClick={handleConnect}
//       />
//       <Abstraxion onClose={() => { setShow(false); setLoading(false); }} />
//     </section>
//   );
// };

// export default XionWallet;
