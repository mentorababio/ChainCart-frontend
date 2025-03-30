// import { maskAddress } from "@/utils/maskAddress";
// import { motion } from "framer-motion";
// import AppButton from "../shared/AppButton";
// import { Abstraxion } from "@burnt-labs/abstraxion";
// import useWallet from "./useWallet";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";



// const XionWallet = () => {
//   const { setShow, bech32Address, isConnected, isConnecting } = useWallet();
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
//             label={`Disconnect ${maskAddress(bech32Address!)}`}
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
 
// };

// export default XionWallet;
