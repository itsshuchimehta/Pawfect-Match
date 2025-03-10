/**
 * Sidebar displaying user's favorited dogs
 * Allows for match generation and favorite management
 */
"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedFureverFriendButton from "./AnimatedFureverFriendButton"
import type { Dog } from "../types"
import { fetchDogs, getLocationsByZipCodes } from "../utils/api"

interface FavoritesSidebarProps {
  isOpen: boolean
  onClose: () => void
  favorites: string[]
  onRemoveFavorite: (dogId: string) => void
  onGenerateMatch: () => void
}

export default function FavoritesSidebar({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onGenerateMatch,
}: FavoritesSidebarProps) {
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetches detailed information for favorited dogs
   * Enhances dog data with location information
   */
  const fetchFavoriteDogs = useCallback(async () => {
    if (favorites.length === 0) {
      setFavoriteDogs([])
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const dogs = await fetchDogs(favorites)
      const zipCodes = dogs.map((dog) => dog.zip_code).filter(Boolean)
      const locationData = await getLocationsByZipCodes(zipCodes)

      const dogsWithLocationInfo = dogs.map((dog) => {
        if (!dog?.zip_code) return dog
        const location = locationData.find((loc) => loc?.zip_code === dog.zip_code)
        return {
          ...dog,
          city: location?.city || "",
          state: location?.state || "",
        }
      })

      setFavoriteDogs(dogsWithLocationInfo)
    } catch (error) {
      setError("Failed to fetch favorite dogs: " + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsLoading(false)
    }
  }, [favorites])

  useEffect(() => {
    if (isOpen && favoriteDogs.length === 0) {
      fetchFavoriteDogs()
    }
  }, [isOpen, fetchFavoriteDogs, favoriteDogs.length])

  const handleRemoveFavorite = (dogId: string) => {
    setFavoriteDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== dogId))
    onRemoveFavorite(dogId)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-4 z-50 w-[320px] max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col h-[calc(100vh-8rem)] max-h-[600px]"
          >
            <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Favorites</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-transparent">
                  <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-gray-600 dark:text-gray-300">Loading...</div>
              ) : favoriteDogs.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <AnimatePresence initial={false}>
                    {favoriteDogs.map((dog) => (
                      <motion.li
                        key={dog.id}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <div className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <div className="flex-shrink-0">
                            <img
                              src={dog.img || "/placeholder.svg"}
                              alt={dog.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{dog.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{dog.breed}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFavorite(dog.id)}
                            className="flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-transparent"
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">No favorites yet.</div>
              )}
            </div>

            <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
              <AnimatedFureverFriendButton
                onClick={() => {
                  onClose() // Close the sidebar first
                  onGenerateMatch() // Then generate the match
                }}
                disabled={favoriteDogs.length === 0}
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

