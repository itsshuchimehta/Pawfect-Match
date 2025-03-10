"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, PawPrint, Stars } from "lucide-react"
import { Button } from "@/components/ui/button"
import Fireworks from "./Fireworks"
import { useMediaQuery } from "../hooks/useMediaQuery"
import DynamicMetadata from "./DynamicMetadata"

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
  city?: string
  state?: string
}

interface MatchPopupProps {
  dog: Dog
  onClose: () => void
}

export default function MatchPopup({ dog, onClose }: MatchPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const isIpadMini = useMediaQuery("(width: 1024px) and (height: 768px)")

  useEffect(() => {
    setIsVisible(true)
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleAdopt = () => {
    setShowConfirmation(true)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <DynamicMetadata
            title={`You matched with ${dog.name}! | Pawfect Match`}
            description={`Congratulations! You've found your Fur-ever Friend: ${dog.name}, a ${dog.age}-year-old ${dog.breed.toLowerCase()}.`}
            image={dog.img}
          />
          <Fireworks />
          <div className="fixed inset-0 z-[9999]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className={`bg-white dark:bg-gray-900 rounded-xl w-full mx-auto relative ${
                  isIpadMini ? "max-w-[500px] max-h-[550px]" : "sm:max-w-md md:max-w-lg max-h-[85vh]"
                } flex flex-col overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 hover:bg-gray-100 dark:hover:bg-gray-800 z-10"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>

                {!showConfirmation ? (
                  <div className="flex flex-col h-full">
                    <div className="text-center p-3">
                      <motion.h2
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="font-bold text-primary dark:text-white text-2xl sm:text-3xl flex items-center justify-center gap-2"
                      >
                        <Stars className="h-6 w-6" />
                        Pawsome Match!
                        <Stars className="h-6 w-6" />
                      </motion.h2>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                      <div className="relative rounded-lg overflow-hidden mb-4">
                        <motion.img
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          src={dog.img || "/placeholder.svg"}
                          alt={dog.name}
                          className="w-full object-cover aspect-[4/3] rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg shadow-md p-4"
                      >
                        <h3 className="font-bold text-primary dark:text-white mb-2 font-heading text-2xl">
                          {dog.name}
                        </h3>
                        <div className="relative">
                          <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
                          <p className="text-gray-700 dark:text-gray-200 leading-relaxed pl-4 border-l-4 border-primary/20 italic text-sm">
                            Meet <span className="font-semibold text-primary">{dog.name}</span>, a{" "}
                            <span className="font-semibold">{dog.age}-year-old</span>
                            <span className="font-semibold"> {dog.breed.toLowerCase()}</span> from
                            <span className="font-semibold">
                              {" "}
                              {dog.city && dog.state ? `${dog.city}, ${dog.state}` : dog.zip_code}
                            </span>
                            . This lovable pup is eagerly waiting to bring joy and companionship to their forever home!
                          </p>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <PawPrint className="h-3 w-3 mr-1 text-primary" />
                            Ready for adoption
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          onClick={handleAdopt}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg h-12"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span>I Want to Adopt {dog.name}! 😍✨</span>
                          </div>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col justify-center items-center p-6 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 8 }}
                      className="mb-4"
                    >
                      <h2 className="font-bold text-primary dark:text-white mb-2 text-2xl flex items-center gap-2">
                        Yay! 🎉
                      </h2>
                    </motion.div>
                    <div className="space-y-3 mb-6 text-center">
                      <p className="text-lg text-gray-900 dark:text-white">
                        We're so excited that you want to adopt {dog.name}!
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Our adoption team will contact you soon to start the adoption process.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        Get ready to welcome your new furry friend home!{" "}
                      </p>
                    </div>
                    <Button
                      onClick={handleClose}
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Close
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

