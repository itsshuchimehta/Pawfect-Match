/**
 * Site header component
 * Handles navigation, authentication status, and theme toggling
 * Responsive design with mobile menu
 */
"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, PawPrint, Menu, X, Moon, Sun } from "lucide-react"
import { logout } from "../utils/api"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  isAuthenticated: boolean
  onLogout: () => void
  userName: string
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
}

export default function Header({ isAuthenticated, onLogout, userName, isDarkMode, setIsDarkMode }: HeaderProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      setIsMobileMenuOpen(false)
      await logout()
      onLogout()
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = 80 
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: [1] },
    )

    observer.observe(header)

    return () => {
      observer.unobserve(header)
    }
  }, [])

  const ModeToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="mr-2"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )

  const handleNavigation = (action: () => void) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      action()
    }, 10)
  }

  const NavigationItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {isAuthenticated ? (
        <>
            <span className="text-base text-primary/80 dark:text-primary/60 font-medium md:flex items-center gap-4">
              Welcome back, {userName}!
            </span>
            <Button
              variant="outline"
              onClick={() => handleNavigation(handleLogout)}
              className={`bg-white/80 dark:bg-primary hover:bg-white dark:hover:bg-primary/90 text-primary hover:text-primary/80 dark:text-primary-foreground dark:hover:text-primary-foreground/80 border-primary/20 dark:border-primary/40 hover:border-primary/40 dark:hover:border-primary/60 transition-all duration-300 ${
                isMobile ? "w-full" : "ml-2"
              }`}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className={`text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/20 ${
              isMobile ? "justify-start w-full" : ""
            }`}
            onClick={() => {
              const action = () => scrollToSection("login-form")
              if (isMobile) {
                handleNavigation(action)
              } else {
                action()
              }
            }}
          >
            Get Started
          </Button>
          <Button
            variant="ghost"
            className={`text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/20 ${
              isMobile ? "justify-start w-full" : ""
            }`}
            onClick={() => {
              const action = () => scrollToSection("features")
              if (isMobile) {
                handleNavigation(action)
              } else {
                action()
              }
            }}
          >
            Learn More
          </Button>
          <Button
            className={`bg-white dark:bg-primary hover:bg-gray-100 dark:hover:bg-primary/90 text-primary dark:text-primary-foreground font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-primary/20 dark:border-primary/40 ${
              isMobile ? "w-full" : ""
            }`}
            onClick={() => {
              const action = () => scrollToSection("login-form")
              if (isMobile) {
                handleNavigation(action)
              } else {
                action()
              }
            }}
          >
            Login
          </Button>
        </>
      )}
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="header-container"
      ref={headerRef}
    >
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 via-white/50 to-pink-50/90 backdrop-blur-sm dark:from-purple-900/90 dark:via-gray-900/50 dark:to-pink-900/90" />
          <div className="relative flex items-center justify-between gap-4 px-6 py-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-8 h-5">
                  {/* Animated paw prints */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2,
                      times: [0, 0.2, 0.8, 1],
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    }}
                    className="absolute left-0 top-0"
                  >
                    <PawPrint className="h-2.5 w-2.5 text-primary fill-current" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2,
                      times: [0, 0.2, 0.8, 1],
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                      delay: 1,
                    }}
                    className="absolute right-0 bottom-1"
                  >
                    <PawPrint className="h-2.5 w-2.5 text-primary fill-current" />
                  </motion.div>
                </div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary/90 to-purple-400 bg-clip-text text-transparent"
                >
                  Pawfect Match
                </motion.h1>
              </Link>
            </div>

            {/* Mobile Menu and Mode Toggle */}
            <div className="flex items-center md:hidden">
              <ModeToggle />
              <button className="text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-end flex-grow">
              <NavigationItems />
              <ModeToggle />
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && !isLoggingOut && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 relative z-50"
            >
              <div className="flex flex-col p-4 space-y-2">
                <NavigationItems isMobile={true} />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {/* Added a spacer to prevent content from being hidden under the fixed header */}
      <div className="h-20"></div>
    </motion.div>
  )
}

