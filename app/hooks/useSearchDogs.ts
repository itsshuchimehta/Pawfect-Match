"use client"

import { useState, useCallback, useEffect } from "react"
import { searchDogs, fetchDogs, getLocationsByZipCodes } from "../utils/api"
import type { Dog, SearchResponse, SearchParams } from "../types"
import { debounce } from "lodash"

export function useSearchDogs(initialFilters: SearchParams) {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<SearchParams>(initialFilters)

  const fetchDogData = useCallback(async (searchParams: SearchParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const searchResult = await searchDogs(searchParams)

      // Adjust total if it exceeds the maximum allowed
      const adjustedTotal = Math.min(searchResult.total, 10000)
      setSearchResponse({ ...searchResult, total: adjustedTotal })

      if (searchResult.resultIds.length === 0) {
        setDogs([])
        return
      }

      const dogData = await fetchDogs(searchResult.resultIds)
      const zipCodes = dogData.map((dog) => dog.zip_code).filter(Boolean)
      const locationData = await getLocationsByZipCodes(zipCodes)

      const dogsWithLocationInfo = dogData.map((dog) => {
        if (!dog?.zip_code) return dog
        const location = locationData.find((loc) => loc?.zip_code === dog.zip_code)
        return {
          ...dog,
          city: location?.city || "",
          state: location?.state || "",
        }
      })

      setDogs(dogsWithLocationInfo)
    } catch (error) {
      if (error instanceof Error) {
        setError(` Error details: ${error.message}`)
      } else if (typeof error === "object" && error !== null) {
        setError(` Error details: ${JSON.stringify(error)}`)
      }
      
      setDogs([])
      setSearchResponse(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const debouncedFetchDogData = useCallback(
    debounce((searchParams: SearchParams) => fetchDogData(searchParams), 300) as ((
      searchParams: SearchParams,
    ) => Promise<void>) & { cancel: () => void },
    [fetchDogData],
  )

  useEffect(() => {
    debouncedFetchDogData(filters)
    return () => {
      debouncedFetchDogData.cancel()
    }
  }, [filters, debouncedFetchDogData])

  const updateFilters = useCallback((newFilters: Partial<SearchParams>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      from: newFilters.from ?? "0", // Reset to first page on filter change unless specified
      size: newFilters.size ?? prevFilters.size, // Ensure size is preserved if not explicitly changed
    }))
  }, [])

  return { dogs, searchResponse, isLoading, error, updateFilters, filters }
}

