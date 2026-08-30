"use client"

import Link from "next/link"
import {
  ArrowRight,
  Bookmark,
  Clock,
  Flame,
  Gamepad2,
  History,
  Play,
} from "lucide-react"
import { GameCard } from "@/components/games/game-card"
import { GameCover } from "@/components/games/game-cover"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { featuredGames, getGame } from "@/data/games"
import { formatDateTime, formatDuration } from "@/lib/format"
import { useApp } from "@/lib/store"
import { cn } from "@/lib/utils"

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
}) {
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <div className="grid">
          <span className="font-heading truncate text-xl font-semibold">
            {value}
          </span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardContent() {
  const { user, library, sessions, settings } = useApp()
  const name = settings.displayName || user?.name || "Player"

  const totalSec = sessions.reduce((acc, s) => acc + s.durationSec, 0)

  const genreCount = new Map<string, number>()
  for (const session of sessions) {
    for (const genre of getGame(session.gameSlug)?.genres ?? []) {
      genreCount.set(genre, (genreCount.get(genre) ?? 0) + 1)
    }
  }
  const favoriteGenre = [...genreCount.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0]

  const libraryGames = library
    .map((slug) => getGame(slug))
    .filter((game) => game !== undefined)
  const quickLaunch = (
    libraryGames.length > 0 ? libraryGames : featuredGames()
  ).slice(0, 4)
  const recent = sessions.slice(0, 5)

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Welcome back, {name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {sessions.length > 0
            ? `You've streamed ${formatDuration(totalSec)} across ${sessions.length} session${sessions.length === 1 ? "" : "s"}.`
            : "Ready for your first session?"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Clock} value={formatDuration(totalSec)} label="Total playtime" />
        <StatCard icon={History} value={String(sessions.length)} label="Sessions" />
        <StatCard icon={Bookmark} value={String(libraryGames.length)} label="Games in library" />
        <StatCard icon={Flame} value={favoriteGenre ?? "—"} label="Favorite genre" />
      </div>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            {libraryGames.length > 0 ? "Jump back in" : "Recommended for you"}
          </h3>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/games">
              Browse all
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickLaunch.map((game, i) => (
            <GameCard key={game.slug} game={game} index={i} />
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Recent sessions</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sessions">View all</Link>
          </Button>
        </div>
        {recent.length === 0 ? (
          <Card size="sm">
            <CardContent className="grid place-items-center gap-3 py-8 text-center">
              <Gamepad2 className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No sessions yet — launch a game and it&apos;ll show up here.
              </p>
              <Button size="sm" asChild>
                <Link href="/games">
                  <Play data-icon="inline-start" />
                  Browse games
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card size="sm" className="gap-0 py-0">
            {recent.map((session, i) => {
              const game = getGame(session.gameSlug)
              return (
                <div
                  key={session.id}
                  className={cn(
                    "flex items-center gap-4 p-4",
                    i > 0 && "border-t border-border/60"
                  )}
                >
                  {game && <GameCover game={game} className="w-10 rounded-md" />}
                  <div className="grid min-w-0 flex-1">
                    <span className="truncate text-sm font-medium">
                      {game?.title ?? session.gameSlug}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {formatDateTime(session.startedAt)} ·{" "}
                      {formatDuration(session.durationSec)} · {session.quality}{" "}
                      · {session.avgLatencyMs} ms
                    </span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/play/${session.gameSlug}`}>
                      <Play data-icon="inline-start" />
                      Play again
                    </Link>
                  </Button>
                </div>
              )
            })}
          </Card>
        )}
      </section>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <DashboardContent />
    </AppShell>
  )
}
