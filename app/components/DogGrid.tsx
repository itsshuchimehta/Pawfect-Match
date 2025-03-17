"use client"

import type React from "react"

import { motion } from "framer-motion"
import DogCard from "./DogCard"
import type { Dog } from "../types"

interface DogGridProps {
  dogs: Dog[]
  favorites: string[]
  onDogClick: (index: number) => void
  onToggleFavorite: (dogId: string) => void
}

export default function DogGrid({ dogs, favorites, onDogClick, onToggleFavorite }: DogGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pb-5"
    >
      {dogs.map((dog, index) => (
        <div key={dog.id} onClick={() => onDogClick(index)}>
          <DogCard
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            onToggleFavorite={(e: React.MouseEvent) => {
              e.stopPropagation()
              onToggleFavorite(dog.id)
            }}
          />
        </div>
      ))}
    </motion.div>
  )
}

