"use client"

import { useState, useEffect, useCallback } from "react"
import { useResponsive } from "./useResponsive"

const DOGS_PER_PAGE = {
  default: 15,
  sm: 9,
  md: 9,
  lg: 12,
  xl: 15,
  "2xl": 18,
}

export function usePageSize() {
  const { isSmall, isMedium, isLarge, isXL, is2XL } = useResponsive()

  const getCurrentPageSize = useCallback(() => {
    if (is2XL) return DOGS_PER_PAGE["2xl"]
    if (isXL) return DOGS_PER_PAGE.xl
    if (isLarge) return DOGS_PER_PAGE.lg
    if (isMedium) return DOGS_PER_PAGE.md
    if (isSmall) return DOGS_PER_PAGE.sm
    return DOGS_PER_PAGE.default
  }, [is2XL, isXL, isLarge, isMedium, isSmall])

  const [pageSize, setPageSize] = useState(getCurrentPageSize())

  useEffect(() => {
    const newPageSize = getCurrentPageSize()
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize)
    }
  }, [getCurrentPageSize, pageSize])

  return pageSize
}

