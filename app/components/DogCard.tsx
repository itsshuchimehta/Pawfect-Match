"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
  city?: string
  state?: string
}

interface DogCardProps {
  dog: Dog
  isFavorite: boolean
  onToggleFavorite: (e: React.MouseEvent) => void
}

export default function DogCard({ dog, isFavorite, onToggleFavorite }: DogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md relative group"
    >
      <div className="relative w-full bg-gray-100" style={{ aspectRatio: "4/3" }}>
        {/* Blurred background */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
          style={{
            backgroundImage: `url(${dog.img || "./placeholder.svg"})`,
            opacity: 0.5,
          }}
        />
        {/* Main image */}
        <img
          src={dog.img || "./placeholder.svg"}
          alt={dog.name}
          className="absolute inset-0 w-full h-full object-contain"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors hover:bg-white"
          aria-label={isFavorite ? `Remove ${dog.name} from favorites` : `Add ${dog.name} to favorites`}
        >
          <Heart
            className={cn("w-5 h-5 transition-colors", isFavorite ? "text-red-500 fill-red-500" : "text-gray-600")}
          />
        </motion.button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{dog.name}</h2>
          <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
            {dog.age} {dog.age === 1 ? "year" : "years"}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{dog.breed}</p>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-1"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>
            {dog.city && dog.state ? `${dog.city}, ${dog.state}` : ""} {dog.zip_code}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

