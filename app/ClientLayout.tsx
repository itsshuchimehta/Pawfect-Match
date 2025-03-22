"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { checkAuthStatus } from "./utils/api"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WelcomeAnimation from "./components/WelcomeAnimation"
import Login from "./components/Login"
import { AnimatePresence, motion } from "framer-motion"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showLogoutAnimation, setShowLogoutAnimation] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  

  useEffect(() => {    
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeMediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addListener(listener)
    return () => darkModeMediaQuery.removeListener(listener)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true)
      try {
        const authStatus = checkAuthStatus()
        setIsAuthenticated(authStatus.isAuthenticated)
        setUserName(authStatus.userName || "")

        if (!authStatus.isAuthenticated && pathname === "/") {
          setShowWelcome(true)
          const timer = setTimeout(() => {
            setShowWelcome(false)
          }, 4000)
          return () => clearTimeout(timer)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
        setUserName("")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname])

  const handleLogin = (name: string) => {
    setIsAuthenticated(true)
    setUserName(name)
  }

  const handleLogout = () => {
    setShowLogoutAnimation(true)
    setTimeout(() => {
      setIsAuthenticated(false)
      setUserName("")
      setShowLogoutAnimation(false)
      router.push("/")
    }, 2000) 
  }

  const isRootPath = pathname === "/"

  return (
    <AnimatePresence mode="wait">
      {showWelcome || showLogoutAnimation ? (
        <WelcomeAnimation key="welcome" isDarkMode={isDarkMode} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isRootPath && (
            <Header
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              userName={userName}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )}
          <main className="flex-grow">
            {isRootPath && !isAuthenticated ? <Login onLogin={handleLogin} /> : children}
          </main>
          {isRootPath && <Footer />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

