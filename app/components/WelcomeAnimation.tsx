"use client"

import { motion, AnimatePresence } from "framer-motion"
import { PawPrint } from "lucide-react"
import { useEffect, useState } from "react"

export default function WelcomeAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  const [step, setStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const totalSteps = 4
  const animationDuration = 1
  const staggerDelay = 0.5

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep >= totalSteps - 1) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), animationDuration * 1000)
          return prevStep
        }
        return prevStep + 1
      })
    }, staggerDelay * 1000)

    return () => clearInterval(interval)
  }, [])

  const pawPrints = [
    { key: 0, left: "10%", top: "20%" },
    { key: 1, left: "30%", top: "60%" },
    { key: 2, left: "50%", top: "10%" },
    { key: 3, left: "70%", top: "40%" },
  ]

  const getOpacity = (index: number) => {
    if (step === index || step === index + 1) return 1
    if (step >= totalSteps - 1 && (index === totalSteps - 2 || index === totalSteps - 1)) return 1
    return 0
  }

  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-r from-purple-50 to-pink-50"
      } z-50 p-4 sm:p-0`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => {
        if (isComplete) {
          document.body.style.overflow = "auto"
        }
      }}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-32 sm:w-80 sm:h-40 mb-4 sm:mb-8">
          <AnimatePresence>
            {pawPrints.map((paw, index) => (
              <motion.div
                key={`${paw.key}-${Math.floor(step / 4)}`}
                className="absolute"
                style={{ left: paw.left, top: paw.top }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: getOpacity(index), scale: getOpacity(index) }}
                transition={{ duration: animationDuration / 2 }}
              >
                <PawPrint className="h-8 w-8 sm:h-12 sm:w-12 text-transparent fill-[url(#pawGradient)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.h1
          className="text-4xl sm:text-6xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500">
            Pawfect Match
          </span>
        </motion.h1>
      </div>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="pawGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

