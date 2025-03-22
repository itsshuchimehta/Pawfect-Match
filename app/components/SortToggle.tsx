"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface SortToggleProps {
  onToggle: (field: "breed" | "age", order: "asc" | "desc") => void
}

export default function SortToggle({ onToggle }: SortToggleProps) {
  const [breedSortOrder, setBreedSortOrder] = useState<"asc" | "desc">("asc")
  const [ageSortOrder, setAgeSortOrder] = useState<"asc" | "desc">("asc")

  const handleBreedToggle = () => {
    const newOrder = breedSortOrder === "asc" ? "desc" : "asc"
    setBreedSortOrder(newOrder)
    setAgeSortOrder("asc") // Reset age sort to asc
    onToggle("breed", newOrder)
  }

  const handleAgeToggle = () => {
    const newOrder = ageSortOrder === "asc" ? "desc" : "asc"
    setAgeSortOrder(newOrder)
    setBreedSortOrder("asc") 
    onToggle("age", newOrder)
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleAgeToggle}
        className="flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out text-gray-900 dark:text-gray-100"
        aria-label={`Sort age ${ageSortOrder === "asc" ? "ascending" : "descending"}`}
      >
        <span className="mr-2 text-sm font-medium">Age</span>
        <motion.div
          initial={false}
          animate={{ rotate: ageSortOrder === "asc" ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </button>
      <button
        onClick={handleBreedToggle}
        className="flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out text-gray-900 dark:text-gray-100"
        aria-label={`Sort breeds ${breedSortOrder === "asc" ? "ascending" : "descending"}`}
      >
        <span className="mr-2 text-sm font-medium">Breed</span>
        <motion.div
          initial={false}
          animate={{ rotate: breedSortOrder === "asc" ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </button>
    </div>
  )
}

