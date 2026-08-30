"use client"

import * as React from "react"
import { Gamepad2, Search } from "lucide-react"
import { GameCard } from "@/components/games/game-card"
import { Input } from "@/components/ui/input"
import { games, genres, type GameGenre } from "@/data/games"
import { cn } from "@/lib/utils"

export default function GamesPage() {
  const [query, setQuery] = React.useState("")
  const [genre, setGenre] = React.useState<GameGenre | "All">("All")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return games.filter((game) => {
      const matchesQuery =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q)
      const matchesGenre = genre === "All" || game.genres.includes(genre)
      return matchesQuery && matchesGenre
    })
  }, [query, genre])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Game library
        </h1>
        <p className="mt-1 text-muted-foreground">
          {games.length} titles included with your plan — more added monthly.
        </p>
      </div>

      <div className="mb-8 grid gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles or studios…"
            className="pl-8"
            aria-label="Search games"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by genre">
          {(["All", ...genres] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGenre(g)}
              className={cn(
                "rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
                genre === g
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((game, i) => (
            <GameCard key={game.slug} game={game} index={i} />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
          <Gamepad2 className="size-8 text-muted-foreground" />
          <p className="font-medium">No games found</p>
          <p className="text-sm text-muted-foreground">
            Nothing matches “{query}”{genre !== "All" && ` in ${genre}`}. Try
            another search.
          </p>
        </div>
      )}
    </div>
  )
}
