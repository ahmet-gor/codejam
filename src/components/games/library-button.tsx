"use client"

import { Bookmark, BookmarkCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { Game } from "@/data/games"
import { useApp } from "@/lib/store"

export function LibraryButton({
  game,
  size = "lg",
}: {
  game: Game
  size?: "sm" | "lg"
}) {
  const { user, library, toggleLibrary } = useApp()
  const saved = library.includes(game.slug)

  return (
    <Button
      variant="outline"
      size={size === "lg" ? "lg" : "sm"}
      className={size === "lg" ? "h-11 px-5" : undefined}
      onClick={() => {
        if (!user) {
          toast.info("Sign in to save games to your library")
          return
        }
        toggleLibrary(game.slug)
        toast.success(saved ? "Removed from library" : "Added to library", {
          description: game.title,
        })
      }}
    >
      {saved ? (
        <BookmarkCheck data-icon="inline-start" className="text-primary" />
      ) : (
        <Bookmark data-icon="inline-start" />
      )}
      {saved ? "In library" : "Add to library"}
    </Button>
  )
}
