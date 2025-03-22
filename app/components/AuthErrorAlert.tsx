"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AuthErrorAlertProps {
  onClose: () => void
}

export default function AuthErrorAlert({ onClose }: AuthErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Wait for exit animation to complete
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-0 right-0 z-[100] mx-auto max-w-3xl px-4 pt-4"
        >
          <div className="rounded-lg bg-amber-50 p-4 shadow-lg border border-amber-200 dark:bg-amber-900/70 dark:border-amber-700">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Authentication Error</h3>
                <div className="mt-2 text-sm text-amber-700 dark:text-amber-200">
                  <p>Your browser privacy settings are preventing authentication. This may be due to:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Third-party cookies being blocked</li>
                    <li>Private/Incognito browsing mode</li>
                    <li>"Prevent Cross-Site Tracking" being enabled</li>
                  </ul>
                  <p className="mt-2">Please adjust your browser settings or try a different browser to continue.</p>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-amber-50 text-amber-500 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-transparent dark:text-amber-400 dark:hover:text-amber-300"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

