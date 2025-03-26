import { motion } from "framer-motion";
import { useState } from "react";
import AppButton from "./AppButton";
import { useNavigate } from "react-router-dom";

export default function SwitchButton() {
  const [selected, setSelected] = useState<"buyer" | "seller">("buyer");
  const navigate = useNavigate();

  return (
    <section className="relative flex p-1 rounded-lg w-64 justify-center md:justify-start">
      <motion.div
        className="absolute inset-y-0 left-1/2 md:left-0 md:w-1/2 rounded-lg transition-all bg-gray-200"
        animate={{ x: selected === "seller" ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <AppButton
        label="Buyer"
        variant={selected === "buyer" ? "default" : "secondary"}
        className="px-4 md:w-1/2 rounded-none relative z-10 text-center"
        onClick={() => {
          setSelected("buyer");
          navigate("/");
        }}
      />
      <AppButton
        label="Seller"
        variant={selected === "seller" ? "default" : "secondary"}
        className={`px-4 md:w-1/2 rounded-none relative z-10 text-center`}
        onClick={() => {
          setSelected("seller");
          navigate("/seller");
        }}
      />
    </section>
  );
}
