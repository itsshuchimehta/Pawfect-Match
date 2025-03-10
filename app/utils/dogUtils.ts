/**
 * Utility functions for dog-related operations
 * Handles match generation and favorites management
 */
import { generateMatch, fetchDogs, getLocationsByZipCodes } from "./api"
import type { Dog } from "../types"

/**
 * Generates a match based on user favorites
 * Fetches the matched dog data and enhances it with location information
 */
export const handleGenerateMatch = async (
  favorites: string[],
  setMatchedDog: (dog: Dog) => void,
  setShowMatchPopup: (show: boolean) => void,
  setIsLoading?: (loading: boolean) => void,
  setError?: (error: string | null) => void,
): Promise<void> => {
  if (favorites.length === 0) {
    alert("Please favorite at least one dog before finding your Fur-ever Friend.")
    return
  }

  if (setIsLoading) setIsLoading(true)
  if (setError) setError(null)

  try {
    const matchId = await generateMatch(favorites)
    const [matchedDogData] = await fetchDogs([matchId])

    if (matchedDogData) {
      const [location] = await getLocationsByZipCodes([matchedDogData.zip_code])
      const enhancedDog = {
        ...matchedDogData,
        city: location?.city || "",
        state: location?.state || "",
      }
      setMatchedDog(enhancedDog)
      setShowMatchPopup(true)
    } else {
      throw new Error("Matched dog not found")
    }
  } catch (error) {
    const errorMessage = "Failed to find Fur-ever Friend: " + (error instanceof Error ? error.message : String(error))
    if (setError) setError(errorMessage)
    console.error(errorMessage)
  } finally {
    if (setIsLoading) setIsLoading(false)
  }
}

/**
 * Toggles a dog's favorite status
 * Updates both state and local storage
 */
export const toggleFavorite = (
  dogId: string,
  favorites: string[],
  setFavorites: (favorites: string[]) => void,
): void => {
  const updatedFavorites = favorites.includes(dogId) ? favorites.filter((id) => id !== dogId) : [...favorites, dogId]
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  setFavorites(updatedFavorites)
}

