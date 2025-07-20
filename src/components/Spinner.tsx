"use client";

import { motion } from "framer-motion";

export const Spinner = () => (
  <div className="flex justify-center items-center p-10">
    <motion.div
      style={{
        width: 50,
        height: 50,
        border: "5px solid #e0e0e0",
        borderTop: "5px solid #3b82f6", // blue-500
        borderRadius: "50%",
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 1,
      }}
    />
  </div>
);
