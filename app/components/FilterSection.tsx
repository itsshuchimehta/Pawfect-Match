"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MultiSelect from "./MultiSelect"
import type { SearchParams } from "../types"

interface FilterSectionProps {
  breeds: string[]
  selectedBreeds: string[]
  ageRange: { min?: number; max?: number }
  updateFilters: (filters: Partial<SearchParams>) => void
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>
  setAgeRange: React.Dispatch<React.SetStateAction<{ min?: number; max?: number }>>
  showMoreFilters: boolean
  isLoadingBreeds: boolean
}

const AGE_RANGES = [
  { label: "Any", min: undefined, max: undefined },
  { label: "Puppy (0-1)", min: 0, max: 1 },
  { label: "Young (1-3)", min: 1, max: 3 },
  { label: "Adult (3-7)", min: 3, max: 7 },
  { label: "Senior (7+)", min: 7, max: undefined },
]

export default function FilterSection({
  breeds,
  selectedBreeds,
  ageRange,
  updateFilters,
  setSelectedBreeds,
  setAgeRange,
  showMoreFilters,
  isLoadingBreeds,
}: FilterSectionProps) {
  const [isAgeOpen, setIsAgeOpen] = useState(false)
  const [isBreedOpen, setIsBreedOpen] = useState(false)
  const [localAgeRange, setLocalAgeRange] = useState(ageRange)

  useEffect(() => {
    setLocalAgeRange(ageRange)
  }, [ageRange])

  const currentAgeRangeLabel = useMemo(() => {
    const foundRange = AGE_RANGES.find((range) => range.min === localAgeRange.min && range.max === localAgeRange.max)
    return foundRange ? foundRange.label : "Any"
  }, [localAgeRange])

  const handleAgeChange = useCallback(
    (value: string) => {
      const range = AGE_RANGES.find((r) => r.label === value) || AGE_RANGES[0]
      setLocalAgeRange({ min: range.min, max: range.max })
      setAgeRange({ min: range.min, max: range.max })
      updateFilters({ ageMin: range.min, ageMax: range.max, from: "0" })
      setIsAgeOpen(false)
    },
    [setAgeRange, updateFilters],
  )

  const handleBreedChange = useCallback(
    (selected: string[]) => {
      setSelectedBreeds(selected)
      updateFilters({ breeds: selected, from: "0" })
      setIsBreedOpen(false)
    },
    [setSelectedBreeds, updateFilters],
  )

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: showMoreFilters ? 1 : 0,
        height: showMoreFilters ? "auto" : 0,
      }}
      exit={{
        opacity: 0,
        height: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="bg-card shadow-md rounded-lg p-4 sm:p-6 mb-8 w-full mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground">Age</label>
            <Select
              value={currentAgeRangeLabel}
              onValueChange={handleAgeChange}
              onOpenChange={setIsAgeOpen}
              open={isAgeOpen}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{currentAgeRangeLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {AGE_RANGES.map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground">Breed</label>
            {isLoadingBreeds ? (
              <div className="p-4">Loading...</div>
            ) : (
              <MultiSelect
                options={breeds}
                selected={selectedBreeds}
                onChange={handleBreedChange}
                placeholder={`${selectedBreeds.length || 0} breeds selected`}
                onOpenChange={setIsBreedOpen}
                open={isBreedOpen}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

