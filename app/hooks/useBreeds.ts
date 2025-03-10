"use client"

import { useState, useEffect } from "react"
import { getBreeds } from "../utils/api"

export function useBreeds() {
  const [breeds, setBreeds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBreeds()
      .then((fetchedBreeds) => {
        setBreeds(fetchedBreeds)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch breeds:", error)
        setError("Failed to fetch dog breeds. Please try again later.")
        setIsLoading(false)
      })
  }, [])

  return { breeds, error, isLoading }
}

