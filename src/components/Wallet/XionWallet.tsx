// import { maskAddress } from "@/utils/maskAddress";
// import { motion } from "framer-motion";
// import AppButton from "../shared/AppButton";
// import { Abstraxion } from "@burnt-labs/abstraxion";
// import { useWallet } from "./useWallet";

// const XionWallet = () => {
//   const { walletAddress, isWalletConnected, handleConnect, handleDisconnect, loading, showModal, setShow } = useWallet();
//     console.log(showModal,'showmaodal')
//   return (
//     <div>
//       {isWalletConnected ? (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <AppButton onClick={handleDisconnect} variant="destructive" label={`Disconnect ${maskAddress(walletAddress!)}`} />
//         </motion.div>
//       ) : (
//           <div className="flex gap-4">
//           <AppButton onClick={() => handleConnect("xion")}  label={walletAddress ? walletAddress :"Connect Xion Wallet"} variant="default"/>
//           <AppButton onClick={() => handleConnect("keplr")} isLoading={loading} label="Connect Keplr Wallet" variant="default"/>
//             <Abstraxion onClose={() => setShow(false)}   />
//         </div>
//       )}
//     </div>
//   );
// };

// export default XionWallet;
