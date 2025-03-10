/**
 * Main search interface component
 * Provides filtering, pagination, and display of available dogs
 */
"use client"

import { useMemo, useEffect, useState, useCallback, useRef, Suspense, lazy } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import Pagination from "./Pagination"
import SortToggle from "./SortToggle"
import Loader from "./Loader"
import FilterManager from "./FilterManager"
import ErrorMessage from "./ErrorMessage"
import AvailableDogCount from "./AvailableDogCount"
import NoResults from "./NoResults"
import { useSearchDogs } from "../hooks/useSearchDogs"
import { useBreeds } from "../hooks/useBreeds"
import { useFavorites } from "../hooks/useFavorites"
import { usePageSize } from "../hooks/usePageSize"
import { handleGenerateMatch } from "../utils/dogUtils"
import type { SearchParams, Dog } from "../types"
import PawPrintBackground from "./PawPrintBackground"
import TopActions from "./TopActions"
import DogGrid from "./DogGrid"
import DynamicMetadata from "./DynamicMetadata"

// Lazy load components
const MatchPopup = lazy(() => import("./MatchPopup"))
const FavoritesSidebar = lazy(() => import("./FavoritesSidebar"))
const DogDetailPopup = lazy(() => import("./DogDetailPopup"))

export default function Search() {
  const { favorites, toggleFavorite } = useFavorites()
  const pageSize = usePageSize()

  const initialFilters = useMemo<SearchParams>(
    () => ({
      breeds: [],
      zipCodes: [],
      ageMin: undefined,
      ageMax: undefined,
      sort: "breed:asc",
      size: pageSize,
      from: "0",
    }),
    [pageSize],
  )

  const { dogs, searchResponse, isLoading, error, updateFilters, filters } = useSearchDogs(initialFilters)

  const [matchedDog, setMatchedDog] = useState<Dog | null>(null)
  const [showMatchPopup, setShowMatchPopup] = useState(false)
  const [showFavoritesSidebar, setShowFavoritesSidebar] = useState(false)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [selectedDogIndex, setSelectedDogIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)

  const { breeds, error: breedError, isLoading: isLoadingBreeds } = useBreeds()

  const searchContentRef = useRef<HTMLDivElement>(null)

  const handleDogClick = useCallback((index: number) => {
    setSelectedDogIndex(index)
    setDirection(0)
  }, [])

  const handlePrevDog = useCallback(() => {
    setSelectedDogIndex((prevIndex) => {
      if (prevIndex !== null && prevIndex > 0) {
        setDirection(-1)
        return prevIndex - 1
      }
      return prevIndex
    })
  }, [])

  const handleNextDog = useCallback(() => {
    setSelectedDogIndex((prevIndex) => {
      if (prevIndex !== null && prevIndex < dogs.length - 1) {
        setDirection(1)
        return prevIndex + 1
      }
      return prevIndex
    })
  }, [dogs.length])

  const calculateTotalPages = useCallback((total: number, pageSize: number) => {
    return Math.ceil(Math.min(total, 10000) / pageSize)
  }, [])

  // Update filters when page size changes
  useEffect(() => {
    updateFilters({ size: pageSize })
  }, [pageSize, updateFilters])

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = 80 // Adjust this value based on your header height
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSection("search-content")
    }, 100)

    return () => clearTimeout(timer)
  }, [scrollToSection])

  const handleFiltersChange = useCallback(
    (newFilters: Partial<SearchParams>) => {
      updateFilters({
        ...newFilters,
        from: "0", // Reset to first page on filter change
        size: pageSize, // Ensure the current page size is applied
      })
    },
    [updateFilters, pageSize],
  )

  const handlePageChange = useCallback(
    (newFrom: number, newSize: number) => {
      updateFilters({ from: String(newFrom), size: newSize })
    },
    [updateFilters],
  )

  const handleSortToggle = useCallback(
    (field: "breed" | "age", order: "asc" | "desc") => {
      updateFilters({ sort: `${field}:${order}` })
    },
    [updateFilters],
  )

  const handleClearFilters = useCallback(() => {
    updateFilters(initialFilters)
    localStorage.removeItem("searchFilters")
    localStorage.removeItem("selectedLocation")
  }, [updateFilters, initialFilters])

  const renderNoResults = useCallback(() => <NoResults onClearFilters={handleClearFilters} />, [handleClearFilters])

  const handleDogDetailPageChange = useCallback(
    async (direction: "prev" | "next") => {
      const currentPage = Math.floor(Number(filters.from) / pageSize) + 1
      const newPage = direction === "next" ? currentPage + 1 : currentPage - 1
      const newFrom = (newPage - 1) * pageSize

      updateFilters({ from: String(newFrom), size: pageSize })

      // Set the selected dog index based on the direction
      if (direction === "next") {
        setSelectedDogIndex(0) // First dog of the new page
      } else {
        setSelectedDogIndex(pageSize - 1) // Last dog of the new page
      }
    },
    [filters.from, pageSize, updateFilters],
  )

  // Memoize total pages calculation
  const totalPages = useMemo(
    () => Math.ceil(Math.min(searchResponse?.total || 0, 10000) / pageSize),
    [searchResponse?.total, pageSize],
  )

  // Add useMemo for the FilterManager component to prevent unnecessary re-renders
  const filterManager = useMemo(
    () => (
      <FilterManager
        onFiltersChange={handleFiltersChange}
        initialFilters={initialFilters}
        showMoreFilters={showMoreFilters}
        onClearFilters={handleClearFilters}
        currentFilters={filters}
        pageSize={pageSize}
        breeds={breeds}
        isLoadingBreeds={isLoadingBreeds}
      />
    ),
    [
      handleFiltersChange,
      initialFilters,
      showMoreFilters,
      handleClearFilters,
      filters,
      pageSize,
      breeds,
      isLoadingBreeds,
    ],
  )

  /**
   * Generates a dynamic page title based on current search filters
   */
  const getMetadataTitle = () => {
    const parts = ["Pawfect Match"]

    if (filters.breeds && filters.breeds.length > 0) {
      parts.push(`${filters.breeds.length === 1 ? filters.breeds[0] : filters.breeds.length + " breeds"}`)
    }

    if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
      let ageText = "Age: "
      if (filters.ageMin !== undefined && filters.ageMax !== undefined) {
        ageText += `${filters.ageMin}-${filters.ageMax} years`
      } else if (filters.ageMin !== undefined) {
        ageText += `${filters.ageMin}+ years`
      } else if (filters.ageMax !== undefined) {
        ageText += `0-${filters.ageMax} years`
      }
      parts.push(ageText)
    }

    return parts.join(" | ")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900 relative">
      <DynamicMetadata
        title={getMetadataTitle()}
        description={`Browse ${searchResponse?.total || "many"} adoptable dogs${
          filters.breeds && filters.breeds.length > 0 ? ` including ${filters.breeds.join(", ")}` : ""
        }.`}
      />
      <PawPrintBackground />
      <div className="flex-grow flex flex-col relative mb-2" ref={searchContentRef}>
        <div id="search-content" className="w-full px-4 sm:px-6 lg:px-8 py-8 pb-1 mb-6">
          <TopActions
            onGenerateMatch={() => handleGenerateMatch(favorites, setMatchedDog, setShowMatchPopup)}
            onShowFavorites={() => setShowFavoritesSidebar(true)}
            favoritesCount={favorites.length}
            isGenerateMatchDisabled={favorites.length === 0 || isLoading}
          />
          {searchResponse && searchResponse.total > 0 && (
            <div className="mb-4 w-full max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
              <AvailableDogCount count={searchResponse.total} />
            </div>
          )}
          {/* Pagination Section */}
          <div className="w-full mb-8">
            <div className="w-full max-w-xl mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
              {/* Combined Filter Layout */}
              <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-center gap-4 w-full md:w-[90%] mx-auto">
                <div className="w-full md:flex-grow md:max-w-xl px-4 md:px-0">{filterManager}</div>
              </div>
              <div className="w-full mb-6 mt-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <Button
                    onClick={() => setShowMoreFilters(!showMoreFilters)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                  >
                    <Filter className="mr-2 h-5 w-5" /> {showMoreFilters ? "Hide Filters" : "More Filters"}
                  </Button>
                  {dogs.length > 0 && <SortToggle onToggle={handleSortToggle} />}
                </div>
              </div>
            </div>
          </div>
          {error && <ErrorMessage message={error} />}
          {/* Pagination above dog results */}
          {searchResponse && searchResponse.total > 0 && (
            <div className="w-full mb-6">
              <Pagination
                onPageChange={handlePageChange}
                currentFrom={Number(filters.from)}
                totalResults={Math.min(searchResponse.total, 10000)}
                isLoading={isLoading}
                pageSize={pageSize}
              />
            </div>
          )}
          {/* Dog Cards Grid */}
          <div className="flex-grow overflow-hidden">
            <div className="min-h-[calc(100vh-300px)] relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-80">
                  <Loader />
                </div>
              ) : dogs.length > 0 ? (
                <DogGrid
                  dogs={dogs}
                  favorites={favorites}
                  onDogClick={handleDogClick}
                  onToggleFavorite={toggleFavorite}
                />
              ) : searchResponse !== null ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
                  <NoResults onClearFilters={handleClearFilters} />
                </div>
              ) : null}
            </div>
          </div>
          {/* Pagination below the main content */}
          {searchResponse && searchResponse.total > 0 && (
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <Pagination
                onPageChange={handlePageChange}
                currentFrom={Number(filters.from)}
                totalResults={Math.min(searchResponse.total, 10000)}
                isLoading={isLoading}
                pageSize={pageSize}
              />
            </div>
          )}
        </div>
        <Suspense fallback={null}>
          {showMatchPopup && matchedDog && <MatchPopup dog={matchedDog} onClose={() => setShowMatchPopup(false)} />}
          <FavoritesSidebar
            isOpen={showFavoritesSidebar}
            onClose={() => setShowFavoritesSidebar(false)}
            favorites={favorites}
            onRemoveFavorite={toggleFavorite}
            onGenerateMatch={() => handleGenerateMatch(favorites, setMatchedDog, setShowMatchPopup)}
          />
          {selectedDogIndex !== null && (
            <DogDetailPopup
              dogs={dogs}
              currentIndex={selectedDogIndex}
              onClose={() => setSelectedDogIndex(null)}
              onPrev={handlePrevDog}
              onNext={handleNextDog}
              isFavorite={(dogId) => favorites.includes(dogId)}
              onToggleFavorite={toggleFavorite}
              onPageChange={handleDogDetailPageChange}
              isFirstPage={Math.floor(Number(filters.from) / pageSize) === 0}
              isLastPage={Math.floor(Number(filters.from) / pageSize) + 1 === totalPages}
              isLoading={isLoading}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}

