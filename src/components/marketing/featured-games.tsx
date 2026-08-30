import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GameCard } from "@/components/games/game-card"
import { Reveal } from "@/components/marketing/reveal"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Button } from "@/components/ui/button"
import { featuredGames } from "@/data/games"

export function FeaturedGames() {
  const games = featuredGames()

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Featured"
        title="Jump into tonight's favorites"
        description="Six of the most-streamed titles this week, ready the moment you press play."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game, i) => (
          <GameCard key={game.slug} game={game} index={i} />
        ))}
      </div>
      <Reveal className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href="/games">
            View all games
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </Reveal>
    </section>
  )
}
