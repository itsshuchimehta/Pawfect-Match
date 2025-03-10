"use client"

import { useState, useEffect, useCallback } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const toggleFavorite = useCallback((dogId: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  return { favorites, toggleFavorite }
}

