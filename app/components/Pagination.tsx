"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PaginationProps {
  onPageChange: (newFrom: number, newSize: number) => void
  currentFrom: number
  totalResults: number
  isLoading: boolean
  pageSize: number
}

export default function Pagination({ onPageChange, currentFrom, totalResults, isLoading, pageSize }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(Math.min(totalResults, 10000) / pageSize))
  const currentPage = Math.max(1, Math.floor(currentFrom / pageSize) + 1)
  const [visiblePages, setVisiblePages] = useState<(number | string)[]>([])

  useEffect(() => {
    const newVisiblePages: (number | string)[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        newVisiblePages.push(i)
      }
    } else {
      newVisiblePages.push(1)

      if (currentPage <= 3) {
        newVisiblePages.push(2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        newVisiblePages.push("...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        newVisiblePages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }

    setVisiblePages(newVisiblePages)
  }, [currentPage, totalPages])

  const handlePageChange = useCallback(
    (newPage: number) => {
      newPage = Math.max(1, Math.min(newPage, totalPages))
      const newFrom = (newPage - 1) * pageSize
      let newSize = pageSize

      if (newPage === totalPages) {
        const remainingResults = totalResults % pageSize
        newSize = remainingResults === 0 ? pageSize : remainingResults
      }

      onPageChange(newFrom, newSize)
    },
    [totalPages, pageSize, totalResults, onPageChange],
  )

  if (totalResults === 0) {
    return null
  }

  return (
    <div className="w-full flex items-center justify-center px-4 gap-2 py-2 max-w-xl mx-auto">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="w-8 h-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <AnimatePresence mode="sync">
        {visiblePages.map((page, index) => (
          <motion.div
            key={`${page}-${index}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {typeof page === "number" ? (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(page)}
                disabled={isLoading}
                className={`w-8 h-8 p-0 ${currentPage === page ? "bg-primary text-primary-foreground" : ""}`}
              >
                {page}
              </Button>
            ) : (
              <span className="w-8 h-8 flex items-center justify-center">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="w-8 h-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

