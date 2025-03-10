/**
 * Detailed view of a selected dog
 * Provides swipe navigation and favorite toggling functionality
 */
"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { X, Heart, ChevronLeft, ChevronRight, Bone, Cake, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Dog } from "../types"
import { useMediaQuery } from "../hooks/useMediaQuery"
import DynamicMetadata from "./DynamicMetadata"

interface DogDetailPopupProps {
  dogs: Dog[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  isFavorite: (dogId: string) => boolean
  onToggleFavorite: (dogId: string) => void
  onPageChange: (direction: "prev" | "next") => Promise<void>
  isFirstPage: boolean
  isLastPage: boolean
  isLoading: boolean
}

export default function DogDetailPopup({
  dogs,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  isFavorite,
  onToggleFavorite,
  onPageChange,
  isFirstPage,
  isLastPage,
  isLoading,
}: DogDetailPopupProps) {
  const searchTitle = document.title
  const searchDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || ""
  const [direction, setDirection] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isChangingPage, setIsChangingPage] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [currentDog, setCurrentDog] = useState<Dog | null>(null)
  const previousDogsRef = useRef<Dog[]>(dogs)
  const isSmallScreen = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const timer = setTimeout(() => setShowSwipeHint(false), 3000)
    return () => {
      document.body.style.overflow = "unset"
      clearTimeout(timer)

      // Restore search page metadata when popup closes
      document.title = searchTitle
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription && searchDescription) {
        metaDescription.setAttribute("content", searchDescription)
      }
    }
  }, [searchTitle, searchDescription])

  useEffect(() => {
    if (!isLoading && !isChangingPage) {
      const newDog = dogs[currentIndex]
      if (newDog && (!currentDog || newDog.id !== currentDog.id)) {
        setCurrentDog(newDog)
        setImageLoaded(false)
        const img = new Image()
        img.src = newDog.img || "/placeholder.svg"
        img.onload = () => setImageLoaded(true)
      }
    }
  }, [currentIndex, dogs, isLoading, isChangingPage, currentDog])

  useEffect(() => {
    if (dogs !== previousDogsRef.current) {
      previousDogsRef.current = dogs
      setIsChangingPage(false)
    }
  }, [dogs])

  /**
   * Handles swipe gestures for navigating between dogs
   * Manages page transitions when reaching the end of current results
   */
  const handleDragEnd = useCallback(
    async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (isLoading || isChangingPage) return

      const swipeThreshold = 100
      const isFirstDog = currentIndex === 0
      const isLastDog = currentIndex === dogs.length - 1

      if (info.offset.x > swipeThreshold) {
        if (!isFirstDog) {
          setDirection(-1)
          onPrev()
        } else if (!isFirstPage) {
          setIsChangingPage(true)
          setDirection(-1)
          await onPageChange("prev")
        }
      } else if (info.offset.x < -swipeThreshold) {
        if (!isLastDog) {
          setDirection(1)
          onNext()
        } else if (!isLastPage) {
          setIsChangingPage(true)
          setDirection(1)
          await onPageChange("next")
        }
      }
    },
    [currentIndex, dogs.length, isFirstPage, isLastPage, onNext, onPageChange, onPrev, isLoading, isChangingPage],
  )

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const showPrevButton = !(isFirstPage && currentIndex === 0) && !isSmallScreen
  const showNextButton = !(isLastPage && currentIndex === dogs.length - 1) && !isSmallScreen

  const handlePrev = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLoading || isChangingPage) return
    if (currentIndex > 0) {
      setDirection(-1)
      onPrev()
    } else if (!isFirstPage) {
      setIsChangingPage(true)
      setDirection(-1)
      await onPageChange("prev")
    }
  }

  const handleNext = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLoading || isChangingPage) return
    if (currentIndex < dogs.length - 1) {
      setDirection(1)
      onNext()
    } else if (!isLastPage) {
      setIsChangingPage(true)
      setDirection(1)
      await onPageChange("next")
    }
  }

  const SwipeHint = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 left-0 right-0 z-30 pointer-events-none"
    >
      <div className="bg-gradient-to-b from-black/60 to-transparent pt-4 pb-8 px-4">
        <div className="flex items-center justify-center space-x-2 text-white">
          <motion.div
            animate={{
              x: [0, 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="w-4 h-4 bg-white rounded-full"
          />
          <span className="text-sm font-medium">Swipe to view more dogs</span>
        </div>
      </div>
    </motion.div>
  )

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + "..."
  }

  const metadataTitle = currentDog ? `${currentDog.name} - Pawfect Match` : "Pawfect Match"
  const metadataDescription = currentDog
    ? `Meet ${currentDog.name}, a ${currentDog.age}-year-old ${currentDog.breed.toLowerCase()} looking for a forever home.`
    : "Find your perfect furry friend and give them a forever home."

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {currentDog && <DynamicMetadata title={metadataTitle} description={metadataDescription} image={currentDog.img} />}
      <div className="relative w-full max-w-3xl h-[80vh] max-h-[800px]" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentDog?.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
          >
            {showSwipeHint && <SwipeHint />}

            {/* Image Container with fixed aspect ratio and blurred background */}
            <div className="absolute inset-0 bg-gray-100">
              <div className="w-full h-full" style={{ aspectRatio: "4/3" }}>
                {/* Blurred background (always visible) */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                  style={{
                    backgroundImage: `url(${currentDog?.img || "/placeholder.svg"})`,
                    opacity: 0.5,
                  }}
                />
                {/* Main image (only visible when loaded and not changing page) */}
                {!isLoading && !isChangingPage && imageLoaded && (
                  <img
                    src={currentDog?.img || "/placeholder.svg"}
                    alt={currentDog?.name}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Gradient overlay for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Loading overlay */}
            {(isLoading || isChangingPage || !imageLoaded) && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}

            {/* Close and Favorite Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(currentDog?.id || "")
                }}
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-colors hover:bg-white"
                disabled={isLoading || isChangingPage}
              >
                <Heart
                  className={`w-7 h-7 transition-colors ${
                    isFavorite(currentDog?.id || "") ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </motion.button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600"
                disabled={isLoading || isChangingPage}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Basic Info and Description */}
            {currentDog && (
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{currentDog.name}</h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Bone className="h-4 w-4" />
                    <span className="text-sm">{currentDog.breed}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Cake className="h-4 w-4" />
                    <span className="text-sm">
                      {currentDog.age} {currentDog.age === 1 ? "year" : "years"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm truncate">
                      {currentDog.city && currentDog.state ? `${currentDog.city}, ${currentDog.state}` : ""}{" "}
                      {currentDog.zip_code}
                    </span>
                  </div>
                </div>

                <div className="text-sm leading-relaxed">
                  {showFullDescription ? (
                    <p>
                      Meet {currentDog.name}, a lovable {currentDog.breed.toLowerCase()} looking for a forever home.
                      With a unique personality and a heart full of love, {currentDog.name} is ready to bring joy,
                      companionship, and endless tail wags to their new family. Could you be the perfect match for this
                      adorable pup?
                    </p>
                  ) : (
                    <p>
                      {truncateDescription(
                        `Meet ${currentDog.name}, a lovable ${currentDog.breed.toLowerCase()} looking for a forever home.`,
                        100,
                      )}{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm font-medium text-white hover:text-white/90"
                        onClick={() => setShowFullDescription(true)}
                      >
                        Read more
                      </Button>
                    </p>
                  )}
                </div>

                {showFullDescription && (
                  <Button
                    variant="ghost"
                    className="mt-2 text-white hover:text-white/90 p-0 h-auto text-sm font-medium hover:bg-transparent"
                    onClick={() => setShowFullDescription(false)}
                  >
                    Show less
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-start pointer-events-none">
          {showPrevButton && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 pointer-events-auto"
              onClick={handlePrev}
              disabled={isChangingPage || isLoading}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center justify-end pointer-events-none">
          {showNextButton && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 pointer-events-auto"
              onClick={handleNext}
              disabled={isChangingPage || isLoading}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

