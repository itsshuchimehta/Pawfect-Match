import AnimatedFureverFriendButton from "./AnimatedFureverFriendButton"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface TopActionsProps {
  onGenerateMatch: () => void
  onShowFavorites: () => void
  favoritesCount: number
  isGenerateMatchDisabled: boolean
}

export default function TopActions({
  onGenerateMatch,
  onShowFavorites,
  favoritesCount,
  isGenerateMatchDisabled,
}: TopActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 w-full max-w-xl mx-auto md:max-w-3xl lg:w-[90%] lg:max-w-none xl:max-w-5xl">
      <AnimatedFureverFriendButton onClick={onGenerateMatch} disabled={isGenerateMatchDisabled} />
      <Button
        onClick={onShowFavorites}
        variant="outline"
        className="w-full sm:w-auto min-w-[120px] h-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-800 dark:text-gray-200 transition-colors flex items-center justify-center rounded-full px-4 shadow-sm text-sm"
      >
        <Heart
          className={`mr-2 h-5 w-5 ${favoritesCount > 0 ? "fill-red-500 text-red-500" : "text-gray-500 dark:text-gray-400"}`}
        />
        <span className="font-medium">Favorites ({favoritesCount})</span>
      </Button>
    </div>
  )
}

