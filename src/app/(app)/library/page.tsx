"use client"

import Link from "next/link"
import { Bookmark, Compass } from "lucide-react"
import { GameCard } from "@/components/games/game-card"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getGame } from "@/data/games"
import { useApp } from "@/lib/store"

function LibraryContent() {
  const { library } = useApp()
  const games = library
    .map((slug) => getGame(slug))
    .filter((game) => game !== undefined)

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Your library
          </h2>
          <p className="text-sm text-muted-foreground">
            {games.length === 0
              ? "Save games you love for one-click access."
              : `${games.length} game${games.length === 1 ? "" : "s"} ready to launch.`}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/games">
            <Compass data-icon="inline-start" />
            Browse games
          </Link>
        </Button>
      </div>

      {games.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game, i) => (
            <GameCard key={game.slug} game={game} index={i} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="grid place-items-center gap-3 py-16 text-center">
            <Bookmark className="size-8 text-muted-foreground" />
            <p className="font-medium">Your library is empty</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Hit the bookmark on any game card and it&apos;ll wait for you
              here, ready to launch in one click.
            </p>
            <Button asChild>
              <Link href="/games">Find your first game</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function LibraryPage() {
  return (
    <AppShell title="Library">
      <LibraryContent />
    </AppShell>
  )
}
