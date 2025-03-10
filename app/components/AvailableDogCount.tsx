"use client"

import { motion } from "framer-motion"
import { PawPrint } from "lucide-react"

interface AvailableDogCountProps {
  count: number
}

export default function AvailableDogCount({ count }: AvailableDogCountProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-primary/20 dark:border-primary/20 py-2 px-4 rounded-lg w-full max-w-max mx-auto text-center flex items-center justify-center md:px-3 md:py-1.5 md:rounded-full md:w-auto md:justify-center shadow-sm"
    >
      <PawPrint className="w-4 h-4 mr-2 flex-shrink-0 text-primary/80 dark:text-primary/60" />
      <span className="text-sm">
        <span className="font-bold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 dark:from-purple-400 dark:via-fuchsia-300 dark:to-pink-300 bg-clip-text text-transparent">
          {count.toLocaleString()}
        </span>{" "}
        <span className="text-gray-600 dark:text-gray-400">tail-wagging matches are ready to meet you!</span>
      </span>
    </motion.div>
  )
}

