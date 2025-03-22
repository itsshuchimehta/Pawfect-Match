"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterSection from "./FilterSection"
import LocationSearch from "./LocationSearch"
import type { LocationSearchResult, SearchParams } from "../types"

const AGE_RANGES = [
  { label: "Any", min: undefined, max: undefined },
  { label: "Puppy (0-1)", min: 0, max: 1 },
  { label: "Young (1-3)", min: 1, max: 3 },
  { label: "Adult (3-7)", min: 3, max: 7 },
  { label: "Senior (7+)", min: 7, max: undefined },
]

interface FilterManagerProps {
  onFiltersChange: (filters: Partial<SearchParams>) => void
  initialFilters: SearchParams
  showMoreFilters: boolean
  onClearFilters: () => void
  currentFilters: SearchParams
  pageSize: number
  breeds: string[]
  isLoadingBreeds: boolean
}

export default function FilterManager({
  onFiltersChange,
  initialFilters,
  showMoreFilters,
  onClearFilters,
  currentFilters,
  pageSize,
  breeds,
  isLoadingBreeds,
}: FilterManagerProps) {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(initialFilters.breeds || [])
  const [selectedLocation, setSelectedLocation] = useState<LocationSearchResult | null>(null)
  const [ageRange, setAgeRange] = useState<{ min?: number; max?: number }>({
    min: initialFilters.ageMin,
    max: initialFilters.ageMax,
  })

  useEffect(() => {
    setSelectedBreeds(currentFilters.breeds || [])
    setAgeRange({
      min: currentFilters.ageMin,
      max: currentFilters.ageMax,
    })

    if (!currentFilters.zipCodes || currentFilters.zipCodes.length === 0) {
      setSelectedLocation(null)
    }
  }, [currentFilters])

  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation")
    if (savedLocation) {
      setSelectedLocation(JSON.parse(savedLocation))
    } else if (initialFilters.zipCodes && initialFilters.zipCodes.length > 0) {
      setSelectedLocation({
        zipCodes: initialFilters.zipCodes,
        displayName: initialFilters.zipCodes.join(", "),
      })
    }
  }, [initialFilters.zipCodes])

  const handleLocationSelect = useCallback(
    (result: LocationSearchResult | null) => {
      setSelectedLocation(result)
      if (result) {
        localStorage.setItem("selectedLocation", JSON.stringify(result))
        onFiltersChange({
          zipCodes: result.zipCodes,
          from: "0",
        })
      } else {
        localStorage.removeItem("selectedLocation")
        onFiltersChange({
          zipCodes: [],
          from: "0",
        })
      }
    },
    [onFiltersChange],
  )

  const hasActiveFilters = selectedBreeds.length > 0 || ageRange.min !== undefined || ageRange.max !== undefined

  const clearFilters = useCallback(() => {
    setSelectedBreeds([])
    setSelectedLocation(null)
    setAgeRange({})
    localStorage.removeItem("selectedLocation")
    localStorage.removeItem("searchFilters")
    onClearFilters()
  }, [onClearFilters])

  const renderClearFiltersButton = useMemo(
    () => (
      <Button
        onClick={clearFilters}
        variant="outline"
        size="sm"
        className="text-xs hover:bg-primary/5 text-primary bg-white/60 border-transparent w-full md:w-auto transition-colors font-medium"
      >
        <X className="mr-1 h-3 w-3" />
        Clear filters to see more available dogs
      </Button>
    ),
    [clearFilters],
  )

  const memoizedAgeRange = useMemo(() => ageRange, [ageRange])

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <div className="w-full max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <LocationSearch
          onLocationSelect={handleLocationSelect}
          selectedLocation={selectedLocation}
          clearInput={selectedLocation === null}
        />
      </div>

      {hasActiveFilters && (
        <div className="w-full max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-wrap gap-1.5 justify-center">
          {ageRange.min !== undefined && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/80 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full flex items-center shadow-sm"
            >
              {AGE_RANGES.find((range) => range.min === ageRange.min && range.max === ageRange.max)?.label}
              <button
                onClick={() => {
                  setAgeRange({})
                  onFiltersChange({ ageMin: undefined, ageMax: undefined })
                }}
                className="ml-1.5 focus:outline-none hover:text-gray-900"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          )}
          {selectedBreeds.map((breed) => (
            <motion.div
              key={breed}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/80 text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full flex items-center shadow-sm"
            >
              {breed}
              <button
                onClick={() => {
                  const newBreeds = selectedBreeds.filter((b) => b !== breed)
                  setSelectedBreeds(newBreeds)
                  onFiltersChange({ breeds: newBreeds })
                }}
                className="ml-1.5 focus:outline-none hover:text-gray-900"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showMoreFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <FilterSection
              breeds={breeds}
              selectedBreeds={selectedBreeds}
              ageRange={memoizedAgeRange}
              updateFilters={onFiltersChange}
              setSelectedBreeds={setSelectedBreeds}
              setAgeRange={setAgeRange}
              showMoreFilters={showMoreFilters}
              isLoadingBreeds={isLoadingBreeds}
            />
            {hasActiveFilters && <div className="flex justify-center mt-4">{renderClearFiltersButton}</div>}
          </motion.div>
        )}
      </AnimatePresence>

      {hasActiveFilters && !showMoreFilters && <div className="flex justify-center">{renderClearFiltersButton}</div>}
    </div>
  )
}

