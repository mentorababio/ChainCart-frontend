import { Clipboard, User } from "lucide-react";
import useAuth from "../auth/hook/useAuth";
import { useEffect, useState, useRef } from "react";
import { RootState, useAppSelector } from "@/store";
import { useGetXionBalanceQuery } from "@/api/xionService";
import { maskAddress } from "@/utils/maskAddress";
import { toast } from "sonner";

export const AvatarMenu = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const address = user?.walletAddress;
  const addressMasked = maskAddress(address || "0x0000000000000000000000000000000000000000");
  const { data } = useGetXionBalanceQuery(address, { skip: !address });
  const balance = data?.data?.balance || "0.00";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address || "0x0000000000000000000000000000000000000000");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (copied) {
      toast.success("Copied to clipboard!");
    }
  }, [copied]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { handleLogout } = useAuth();

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
        if (
            dropdownRef.current && 
            buttonRef.current &&
            (dropdownRef.current.contains(event.target as Node) || 
            buttonRef.current.contains(event.target as Node))
          ) {
            return;
          }
          setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600"
      >
        <User className="text-white" size={20} />
      </button>
      
      {dropdownOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 px-3 max-h-64 overflow-y-auto z-30"
        >
          {/* Address display */}
          <div className="flex items-center justify-between mt-2 text-gray-600 dark:text-gray-400 relative">
            <span className="text-sm truncate pr-6">{addressMasked}</span>
            <Clipboard 
              size={14} 
              className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition absolute right-0"
              onClick={copyToClipboard} 
            />
          </div>
          
          {/* Balance display */}
          <div className="mt-3 mb-3 text-sm">
            <div className="mt-1">
              <span className="text-sm bg-primary text-white px-2 py-1 rounded-lg">
                {balance} XION
              </span>
            </div>
          </div>
          
          {/* Logout button */}
          <div className="w-full border-t border-gray-200 pt-2 mt-1">
            <button 
              onClick={handleLogout} 
              className="block w-full text-left px-2 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;