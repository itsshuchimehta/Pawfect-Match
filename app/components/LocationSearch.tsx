"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchLocations, getLocationsByZipCodes } from "../utils/api"
import { isValidZipCode, isValidState } from "../utils/location"
import type { Location, LocationSearchResult } from "../types"

interface LocationSearchProps {
  onLocationSelect: (result: LocationSearchResult | null) => void
  selectedLocation: LocationSearchResult | null
  clearInput: boolean
}

export default function LocationSearch({ onLocationSelect, selectedLocation, clearInput }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedLocation) {
      setSearchTerm(selectedLocation.displayName)
    } else if (clearInput) {
      setSearchTerm("")
    }
  }, [selectedLocation, clearInput])

  useEffect(() => {
    const searchLocationsDebounced = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([])
        return
      }
      setIsLoading(true)
      setError(null)

      try {
        if (isValidZipCode(searchTerm)) {
          const locations = await getLocationsByZipCodes([searchTerm])
          setSuggestions(locations)
        } else {
          const isState = isValidState(searchTerm)
          const searchParams = isState
            ? { states: [searchTerm.toUpperCase()], size: 100 }
            : { city: searchTerm, size: 100 }

          const response = await searchLocations(searchParams)
          setSuggestions(response.results)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to search locations")
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchLocationsDebounced, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLocationSelect = (location: Location) => {
    const displayName = `${location.city}, ${location.state} ${location.zip_code}`
    setSearchTerm(displayName)
    setSuggestions([])
    setShowSuggestions(false)
    onLocationSelect({
      zipCodes: [location.zip_code],
      displayName,
    })
  }

  const handleStateSelect = (state: string) => {
    const displayName = `All cities in ${state}`
    setSearchTerm(displayName)
    setSuggestions([])
    setShowSuggestions(false)
    onLocationSelect({
      zipCodes: suggestions.map((loc) => loc.zip_code),
      displayName,
    })
  }

  const handleClearLocation = () => {
    setSearchTerm("")
    setSuggestions([])
    setShowSuggestions(false)
    onLocationSelect(null)
  }

  return (
    <div className="relative w-full mr-4" ref={searchRef}>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search by ZIP code, city, or state"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowSuggestions(true)
            if (selectedLocation) {
              onLocationSelect(null)
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          className="pl-12 pr-10 bg-background"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {selectedLocation && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={handleClearLocation}
            aria-label="Clear location"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="absolute z-10 w-full bg-background border border-border rounded-md mt-1 p-2 text-sm text-muted-foreground">
          Searching...
        </div>
      )}

      {error && (
        <div className="absolute z-10 w-full bg-background border border-destructive rounded-md mt-1 p-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full max-w-[calc(100vw-2rem)] bg-background border border-border rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {isValidState(searchTerm) && (
            <li
              className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer font-medium border-b border-border"
              onClick={() => handleStateSelect(searchTerm.toUpperCase())}
            >
              All cities in {searchTerm.toUpperCase()}
            </li>
          )}
          {suggestions.map((location) => (
            <li
              key={location.zip_code}
              className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              onClick={() => handleLocationSelect(location)}
            >
              {location.city}, {location.state} {location.zip_code}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

