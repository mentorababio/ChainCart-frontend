import { maskAddress } from "@/utils/maskAddress";
import { motion } from "framer-motion";
import AppButton from "../shared/AppButton";
import { Abstraxion } from "@burnt-labs/abstraxion";
import useWallet from "./useWallet";
// import { useWallet } from "./useWallet";

const XionWallet = () => {
  const { setShow,bech32Address,isConnected,isConnecting } = useWallet();
    // console.log(showModal,'showmaodal')
  return (
    <div>
      {isConnected ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AppButton onClick={()=>{}} variant="destructive" label={`Disconnect ${maskAddress(bech32Address!)}`} />
        </motion.div>
      ) : (
          <div className="flex gap-4">
          <AppButton  onClick={() => { 
              console.log('click on connecr')
              setShow(true) 
            }} isLoading={isConnecting || isConnected} label={bech32Address ? bech32Address :"Connect Xion Wallet"} variant="default"/>
        </div>
      )}
      <Abstraxion onClose={() => setShow(false)}/>
    </div>
  );
};

export default XionWallet;
