"use client"
import Search from "./components/Search"
import PawPrintBackground from "./components/PawPrintBackground"
import Hero from "./components/Hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-650 relative">
      <PawPrintBackground />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 relative">
        <Hero isAuthenticated={true} />
        <Search />
      </div>
    </div>
  )
}

