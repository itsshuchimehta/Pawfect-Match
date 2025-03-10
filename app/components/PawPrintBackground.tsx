"use client"

import { motion } from "framer-motion"
import { PawPrint } from "lucide-react"
import { useState, useEffect } from "react"

export default function PawPrintBackground() {
  const [pawPrints, setPawPrints] = useState<
    { x: number; y: number; size: number; delay: number }[]
  >([])

  useEffect(() => {
    const prints = []
    const gridSize = 5
    const cellSize = 100 / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        prints.push({
          x: j * cellSize + Math.random() * (cellSize * 0.6),
          y: i * cellSize + Math.random() * (cellSize * 0.6),
          size: Math.random() * 20 + 20,
          delay: Math.random() * 5,
        })
      }
    }
    setPawPrints(prints)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pawPrints.map((print, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/5 dark:text-primary/[0.03]"
          style={{
            top: `${print.y}%`,
            left: `${print.x}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: print.delay,
          }}
        >
          <PawPrint size={print.size} strokeWidth={1.5} className="drop-shadow-sm" />
        </motion.div>
      ))}
    </div>
  )
}

