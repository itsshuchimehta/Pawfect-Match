/**
 * Site footer component
 * Contains attribution, links, and scroll-to-top functionality
 */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-gradient-to-r from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/50 border-t border-primary/20 dark:border-primary/10">
      {/* Update the max-width and width constraints to match the page layout */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary dark:text-primary">Pawfect Match</h3>
            <p className="text-sm text-foreground dark:text-gray-300">
              Find your perfect furry friend and give them a forever home.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary dark:text-primary mb-4">Quick Links</h4>
            <ul className="space-y-1">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/"
                  className="text-sm text-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </motion.li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary dark:text-primary mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-foreground dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{Icon.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary/20 dark:border-primary/10">
          <p className="text-sm text-center text-foreground dark:text-gray-300">
            © {new Date().getFullYear()} Pawfect Match. Created with ❤️ by{" "}
            <a
              href="https://github.com/itsshuchimehta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Shuchi Mehta
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

