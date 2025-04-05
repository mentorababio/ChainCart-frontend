// import { maskAddress } from "@/utils/maskAddress";
// import { motion } from "framer-motion";
import useWallet from "./useWallet";
import {
    Abstraxion,
    // useAbstraxionAccount,
    // useModal
  } from "@burnt-labs/abstraxion";
  import { Button as XIONBUTTON } from "@burnt-labs/ui";
  import { useEffect } from "react";
  import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";



const XionWallet = () => {
  const { setShow, bech32Address, isConnected, isConnecting } = useWallet();
//   const navigate = useNavigate()
//   useEffect(() => {
//     if(isConnected){
//       console.log(bech32Address)
//     }
//   }, [isConnected,navigate]);
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const allParams: Record<string, string> = {};
  
//     params.forEach((value, key) => {
//       allParams[key] = value;
//     });
//     console.log({ allParams });
//   }, []);
  
  
  
//   const handleConnect = () => {
//     setShow(true);
//   };

//   const handleDisconnect = () => {
//     setShow(false);
//     if(!isConnected){
//       navigate("/",{replace:true});
//     }
//   };

//   return (
//     <div>
//       {isConnected ? (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <AppButton
//             onClick={handleDisconnect}
//             variant="destructive"
//             className="hover:bg-amber-100"
//             label={`Disconnect ${maskAddress(bech32Address!)}`}
//             // label={`Disconnect ${maskAddress(bech32Address!)}`}
//           />
//         </motion.div>
//       ) : (
//         <div className="flex gap-4">
//           <AppButton
//             onClick={handleConnect}
//             isLoading={isConnecting} 
//             label={bech32Address ? bech32Address : "Connect Xion Wallet"}
//             variant="default"
//           />
//         </div>
//       )}
//       <Abstraxion  onClose={() => setShow(false)} />
//     </div>
//   );
// const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();

// // General state hooks
// const [, setShow] = useModal();

// watch isConnected and isConnecting
// only added for testing
useEffect(() => {
  console.log({ isConnected, isConnecting });
}, [isConnected, isConnecting])

return (
    <main className="">
      
       <XIONBUTTON
    
        //   fullWidth
          onClick={() => { setShow(true) }}
          structure="base"
          
      >
        {bech32Address ? (
            <div className="flex items-center justify-center">VIEW ACCOUNT</div>
        ) : (
            "CONNECT"
        )}
      </XIONBUTTON> 
      {/* <AppButton label={bech32Address ?'VIEW ACCOUNT' :"CONNECT"}  onClick={() => { setShow(true) }}/> */}
      {
        bech32Address &&
          <div className="border-2 border-primary rounded-md">
            <div className="flex flex-row gap-6 text-red-600">
              <div>
                address
              </div>
              <div>
                {bech32Address}
              </div>
            </div>
          </div>
      }
      <Abstraxion onClose={() => setShow(false)} />
      
    </main>
);
 
};

export default XionWallet;
/**
 * 
 * "use client";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { useEffect } from "react";

export default function Page(): JSX.Element {
  // Abstraxion hooks
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();

  // General state hooks
  const [, setShow] = useModal();

  // watch isConnected and isConnecting
  // only added for testing
  useEffect(() => {
    console.log({ isConnected, isConnecting });
  }, [isConnected, isConnecting])

  return (
      <main className="m-auto flex min-h-screen max-w-xs flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-2xl font-bold tracking-tighter text-black dark:text-white">
          Abstraxion
        </h1>
        <Button
            fullWidth
            onClick={() => { setShow(true) }}
            structure="base"
        >
          {bech32Address ? (
              <div className="flex items-center justify-center">VIEW ACCOUNT</div>
          ) : (
              "CONNECT"
          )}
        </Button>
        {
          bech32Address &&
            <div className="border-2 border-primary rounded-md p-4 flex flex-row gap-4">
              <div className="flex flex-row gap-6">
                <div>
                  address
                </div>
                <div>
                  {bech32Address}
                </div>
              </div>
            </div>
        }
        <Abstraxion onClose={() => setShow(false)} />
      </main>
  );
}
 */
