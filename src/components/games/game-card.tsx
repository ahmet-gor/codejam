"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Bookmark, BookmarkCheck, Play, Star, Users } from "lucide-react"
import { toast } from "sonner"
import { GameCover } from "@/components/games/game-cover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Game } from "@/data/games"
import { useApp } from "@/lib/store"

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  const { user, library, toggleLibrary } = useApp()
  const saved = library.includes(game.slug)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.05 }}
    >
      <Card className="h-full gap-0 py-0 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10">
        <Link href={`/games/${game.slug}`} aria-label={game.title}>
          <GameCover game={game} className="rounded-t-xl" />
        </Link>
        <CardContent className="grid gap-2.5 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="grid gap-1">
              <Link
                href={`/games/${game.slug}`}
                className="font-medium hover:underline"
              >
                {game.title}
              </Link>
              <p className="text-xs text-muted-foreground">
                {game.genres.slice(0, 2).join(" · ")} · {game.releaseYear}
              </p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Star />
              {game.rating}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <Button size="sm" className="flex-1" asChild>
              <Link href={`/play/${game.slug}`}>
                <Play data-icon="inline-start" />
                Play
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              aria-label={saved ? "Remove from library" : "Add to library"}
              onClick={() => {
                if (!user) {
                  toast.info("Sign in to save games to your library")
                  return
                }
                toggleLibrary(game.slug)
                toast.success(
                  saved ? "Removed from library" : "Added to library",
                  { description: game.title }
                )
              }}
            >
              {saved ? (
                <BookmarkCheck className="text-primary" />
              ) : (
                <Bookmark />
              )}
            </Button>
            {game.multiplayer && (
              <Badge variant="outline" className="gap-1">
                <Users />
                MP
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
