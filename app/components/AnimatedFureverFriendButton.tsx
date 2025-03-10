"use client"

import { Button } from "@/components/ui/button"
import { PawPrintIcon as Paw } from "lucide-react"

interface AnimatedFureverFriendButtonProps {
  onClick: () => void
  disabled: boolean
}

export default function AnimatedFureverFriendButton({ onClick, disabled }: AnimatedFureverFriendButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full sm:w-auto group relative overflow-hidden hover:text-white text-primary-foreground transition-all duration-300 h-10 px-4"
    >
      <span className="relative z-10 flex items-center whitespace-nowrap">
        <Paw className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
        Find Your Fur-ever Friend
      </span>
      <span
        className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          transform: "scale(1)",
          opacity: 1,
          transition: "all 0.3s",
        }}
      />
    </Button>
  )
}

