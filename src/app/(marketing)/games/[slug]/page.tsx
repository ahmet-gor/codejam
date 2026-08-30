import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Play, Star, Users } from "lucide-react"
import { GameCard } from "@/components/games/game-card"
import { GameCover } from "@/components/games/game-cover"
import { LibraryButton } from "@/components/games/library-button"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { games, getGame, relatedGames } from "@/data/games"
import { regions } from "@/data/regions"

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/games/[slug]">): Promise<Metadata> {
  const game = getGame((await params).slug)
  if (!game) return {}
  return {
    title: game.title,
    description: game.description,
  }
}

export default async function GameDetailPage({
  params,
}: PageProps<"/games/[slug]">) {
  const { slug } = await params
  const game = getGame(slug)
  if (!game) notFound()

  const related = relatedGames(game)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Link
        href="/games"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All games
      </Link>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <GameCover game={game} className="rounded-xl ring-1 ring-foreground/10" />

        <div className="grid content-start gap-5">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className="gap-1">
              <Star />
              {game.rating}
            </Badge>
            {game.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
            {game.multiplayer && (
              <Badge variant="outline" className="gap-1">
                <Users />
                Multiplayer
              </Badge>
            )}
            {game.isNew && <Badge variant="outline">New release</Badge>}
          </div>

          <div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight">
              {game.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {game.developer} · {game.releaseYear}
            </p>
          </div>

          <p className="max-w-2xl text-pretty leading-relaxed">
            {game.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="h-11 px-5" asChild>
              <Link href={`/play/${game.slug}`}>
                <Play data-icon="inline-start" />
                Launch game
              </Link>
            </Button>
            <LibraryButton game={game} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card size="sm">
              <CardHeader>
                <CardTitle>Nominal system requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-2 text-sm">
                  {Object.entries(game.requirements).map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground capitalize">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-muted-foreground">
                  Specs run on our GPUs — your device only needs a browser.
                </p>
              </CardContent>
            </Card>

            <Card size="sm">
              <CardHeader>
                <CardTitle>Latency by region</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2.5 text-sm">
                  {regions.slice(0, 5).map((region) => (
                    <li key={region.id} className="grid gap-1.5">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {region.name}
                        </span>
                        <span className="font-medium">{region.pingMs} ms</span>
                      </div>
                      <div
                        className="h-1 overflow-hidden rounded-full bg-muted"
                        role="presentation"
                      >
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${100 - region.pingMs * 2.5}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            eyebrow="More like this"
            title={`If you liked ${game.title}`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((rel, i) => (
              <GameCard key={rel.slug} game={rel} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
