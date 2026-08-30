import Image from "next/image"
import { gameImage, type Game } from "@/data/games"
import { cn } from "@/lib/utils"

export function GameCover({
  game,
  className,
}: {
  game: Game
  className?: string
}) {
  return (
    <div
      className={cn("relative aspect-[3/4] overflow-hidden", className)}
      style={{
        background: `linear-gradient(135deg, ${game.cover.from}, ${game.cover.to})`,
      }}
    >
      <Image
        src={gameImage(game)}
        alt={`${game.title} cover art`}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
        className="object-cover"
      />
      {game.isNew && (
        <span className="absolute top-3 left-3 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-amber-950">
          NEW
        </span>
      )}
    </div>
  )
}
