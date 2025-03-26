import { useAbstraxionAccount, useModal } from '@burnt-labs/abstraxion';
import { useEffect } from 'react';
// import { Abstraxion } from "abstraxion";
// import { Abstraxion } from "@burnt-labs/abstraxion";

export default function useWallet() {
    const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
    const [, setShow] = useModal();
    // const [isOpen, setIsOpen] = useState(false);
        // console.log(data)
    // watch isConnected and isConnecting
    // only added for testing
    useEffect(() => {
      console.log({ isConnected, isConnecting,bech32Address });
    }, [isConnected, isConnecting])

  return { bech32Address,setShow,isConnected,isConnecting}
}
