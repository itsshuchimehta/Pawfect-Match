"use client";

import { motion } from "framer-motion";
import { PawPrint, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMediaQuery } from "./hooks/useMediaQuery";

export default function NotFoundClient() {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gradient-to-b from-gray-900 to-purple-900" : "bg-gradient-to-b from-purple-50 to-pink-50"
      } flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full ${
          isDarkMode ? "bg-gray-800/80" : "bg-white/80"
        } backdrop-blur-sm rounded-lg shadow-xl p-8 text-center`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mx-auto w-24 h-24 mb-6 relative"
        >
          <PawPrint className="w-full h-full text-primary opacity-50" />
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <PawPrint className="w-full h-full text-primary" />
          </motion.div>
        </motion.div>

        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"} mb-2`}>
          Oops! Page Not Found
        </h1>
        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-8`}>
          Looks like this page has wandered off! Let's get you back to our furry friends.
        </p>

        <Link href="/" passHref>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}