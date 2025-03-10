"use client"

import { useState, useEffect } from "react"

const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

type Breakpoint = keyof typeof breakpoints

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= breakpoints["2xl"]) setBreakpoint("2xl")
      else if (width >= breakpoints.xl) setBreakpoint("xl")
      else if (width >= breakpoints.lg) setBreakpoint("lg")
      else if (width >= breakpoints.md) setBreakpoint("md")
      else if (width >= breakpoints.sm) setBreakpoint("sm")
      else setBreakpoint(null)
    }

    handleResize() // Call once to set initial state
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    breakpoint,
    isSmall: breakpoint !== null,
    isMedium: breakpoint === "md" || breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
    isLarge: breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
    isXL: breakpoint === "xl" || breakpoint === "2xl",
    is2XL: breakpoint === "2xl",
  }
}

