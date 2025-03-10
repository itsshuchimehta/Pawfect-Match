"use client"

import { motion } from "framer-motion"
import { PawPrint, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PawPrintBackground from "./PawPrintBackground"
import { cn } from "@/lib/utils"

interface HeroProps {
  isAuthenticated: boolean
  onGetStarted?: () => void
  onLearnMore?: () => void
  className?: string
}

export default function Hero({ isAuthenticated, onGetStarted, onLearnMore, className }: HeroProps) {
  return (
    <section className={cn("relative pt-16 pb-24 px-4 sm:pt-20 sm:pb-32 md:pt-24 md:pb-40", className)}>
      <PawPrintBackground  />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block mb-6 md:mb-8"
          >
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9333EA" />
                  <stop offset="50%" stopColor="#D946EF" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <PawPrint className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 stroke-[url(#heroGradient)] stroke-[1.5]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 md:mb-8"
          >
            Find Your{" "}
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Fur-ever
            </span>{" "}
            Friend
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4 sm:px-0"
          >
            {isAuthenticated
              ? "Browse our selection of adorable, adoptable dogs and start your journey to unconditional love today."
              : "Begin your journey to unconditional love. Discover your perfect companion among our adorable adoptable dogs."}
          </motion.p>
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-[#9333EA] hover:bg-[#7E22CE] text-white font-semibold px-8 py-3 rounded-full w-full sm:w-auto md:text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                onClick={onGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#9333EA] text-[#9333EA] dark:text-[#D8B4FE] dark:border-[#D8B4FE] hover:text-[#7E22CE] hover:border-[#7E22CE] dark:hover:text-[#F0ABFC] dark:hover:border-[#F0ABFC] font-semibold px-8 py-3 rounded-full w-full sm:w-auto md:text-lg transition-transform duration-300 hover:scale-105 hover:bg-transparent [&:hover]:bg-transparent"
                onClick={onLearnMore}
              >
                Learn More
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

