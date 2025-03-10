"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  // Initialize with null to indicate we don't know yet
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    // Set initial value once we're on the client
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  // Return false during SSR, and the actual value once on client
  return matches ?? false
}

