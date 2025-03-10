"use client"

import { motion } from "framer-motion"
import { Filter, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoResultsProps {
  onClearFilters: () => void
}

export default function NoResults({ onClearFilters }: NoResultsProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <PawPrint className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary mb-4" />
      </motion.div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Oops! No Furry Friends Found
      </h2>
      <p className="text-lg sm:text-xl mb-4">🔍🐶</p>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
        We couldn't sniff out any pups matching your criteria. Let's fetch a different search!
      </p>
      <Button
        onClick={onClearFilters}
        variant="outline"
        className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 text-sm sm:text-base py-2 px-3 sm:py-2 sm:px-4"
      >
        <Filter className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
        Reset Filters
      </Button>
    </motion.div>
  )
}

