"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Check, Gamepad2, Loader2, LogOut } from "lucide-react"
import { toast } from "sonner"
import { GameCover } from "@/components/games/game-cover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getGame } from "@/data/games"
import { getRegion } from "@/data/regions"
import { formatClock } from "@/lib/format"
import { useApp, useRequireAuth } from "@/lib/store"
import { cn } from "@/lib/utils"

const STEP_DURATION_MS = 1500

const bitrateFor: Record<string, number> = {
  "720p60": 12,
  "1080p60": 25,
  "1440p60": 35,
  "4K60": 45,
}

function CenterScreen({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 grid place-items-center bg-background p-4">
      <div className="grid justify-items-center gap-4 text-center">
        {children}
      </div>
    </div>
  )
}

function HudStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 text-center">
      <span className="font-heading text-lg leading-none font-semibold tabular-nums">
        {value}
      </span>
      <span className="text-[10px] tracking-wider text-white/60 uppercase">
        {label}
      </span>
    </div>
  )
}

export default function PlayPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { ready, user } = useRequireAuth()
  const { settings, addSession } = useApp()

  const game = getGame(params.slug)
  const region = getRegion(settings.region)

  const [phase, setPhase] = React.useState<"connecting" | "live">("connecting")
  const [stepIndex, setStepIndex] = React.useState(0)
  const [stepProgress, setStepProgress] = React.useState(0)
  const [elapsed, setElapsed] = React.useState(0)
  const [liveStats, setLiveStats] = React.useState({
    fps: 0,
    latency: 0,
    bitrate: 0,
  })

  const statsRef = React.useRef({ count: 0, latencySum: 0, fpsSum: 0 })
  const liveStartRef = React.useRef(0)
  const authed = ready && !!user

  const steps = React.useMemo(
    () => [
      {
        label: "Allocating GPU node",
        detail: `RTX-class node · ${region?.name ?? "nearest region"}`,
      },
      {
        label: "Establishing secure stream",
        detail: "WebRTC · DTLS-SRTP handshake",
      },
      {
        label: "Optimizing encoder",
        detail: `NVENC · ${settings.quality} · adaptive bitrate`,
      },
      {
        label: "Ready to play",
        detail: "This is a simulation — no real game is streamed",
      },
    ],
    [region?.name, settings.quality]
  )

  React.useEffect(() => {
    if (phase !== "connecting" || !authed || !game) return
    const start = performance.now()
    const id = setInterval(() => {
      const total = performance.now() - start
      const idx = Math.min(steps.length - 1, Math.floor(total / STEP_DURATION_MS))
      const frac = (total % STEP_DURATION_MS) / STEP_DURATION_MS
      setStepIndex(idx)
      setStepProgress(Math.min(100, frac * 100))
      if (total >= steps.length * STEP_DURATION_MS) {
        clearInterval(id)
        setPhase("live")
      }
    }, 50)
    return () => clearInterval(id)
  }, [phase, authed, game, steps.length])

  React.useEffect(() => {
    if (phase !== "live") return
    liveStartRef.current = Date.now()
    const baseLatency = (region?.pingMs ?? 12) + 3
    const baseBitrate = bitrateFor[settings.quality] ?? 25
    const id = setInterval(() => {
      const fps = 57 + Math.round(Math.random() * 5)
      const latency = baseLatency + Math.round(Math.random() * 4)
      const bitrate = baseBitrate + Math.round((Math.random() - 0.5) * 4)
      statsRef.current.count++
      statsRef.current.latencySum += latency
      statsRef.current.fpsSum += fps
      setLiveStats({ fps, latency, bitrate })
      setElapsed(Math.floor((Date.now() - liveStartRef.current) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [phase, region?.pingMs, settings.quality])

  const quit = React.useCallback(() => {
    if (game && statsRef.current.count > 0) {
      const { count, latencySum, fpsSum } = statsRef.current
      addSession({
        gameSlug: game.slug,
        startedAt: new Date(liveStartRef.current || Date.now()).toISOString(),
        durationSec: elapsed,
        quality: settings.quality,
        avgLatencyMs: Math.round(latencySum / count),
        avgFps: Math.round(fpsSum / count),
      })
      toast.success("Session ended", {
        description: `${game.title} · ${formatClock(elapsed)} · saved to history`,
      })
    }
    router.push("/sessions")
  }, [game, elapsed, addSession, settings.quality, router])

  React.useEffect(() => {
    if (phase !== "live") return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") quit()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [phase, quit])

  if (!game) {
    return (
      <CenterScreen>
        <Gamepad2 className="size-8 text-muted-foreground" />
        <p className="font-medium">Game not found</p>
        <Button variant="outline" asChild>
          <Link href="/games">Back to games</Link>
        </Button>
      </CenterScreen>
    )
  }

  if (!authed) {
    return (
      <CenterScreen>
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Checking your session…</p>
      </CenterScreen>
    )
  }

  const overallProgress =
    ((stepIndex + stepProgress / 100) / steps.length) * 100

  return (
    <AnimatePresence mode="wait">
      {phase === "connecting" ? (
        <motion.div
          key="connecting"
          exit={{ opacity: 0 }}
          className="fixed inset-0 grid place-items-center bg-background p-4"
        >
          <div className="grid w-full max-w-md gap-6">
            <div className="flex items-center gap-4">
              <GameCover
                game={game}
                className="w-16 rounded-lg ring-1 ring-foreground/10"
              />
              <div className="grid gap-1">
                <h1 className="font-heading text-xl font-semibold">
                  {game.title}
                </h1>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" />
                  Connecting to {region?.name ?? "nearest region"}…
                </p>
              </div>
            </div>

            <Progress value={overallProgress} />

            <ol className="grid gap-2.5">
              {steps.map((step, i) => {
                const state =
                  i < stepIndex ? "done" : i === stepIndex ? "active" : "pending"
                return (
                  <li
                    key={step.label}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                      state === "active" && "border-primary/50 bg-primary/5",
                      state === "pending" && "opacity-50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full",
                        state === "done"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {state === "done" ? (
                        <Check className="size-3.5" />
                      ) : state === "active" ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <span className="text-xs">{i + 1}</span>
                      )}
                    </span>
                    <div className="grid">
                      <span className="text-sm font-medium">{step.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {step.detail}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="live"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${game.cover.from}, ${game.cover.to})`,
          }}
        >
          <motion.div
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.28), transparent)",
            }}
          />
          <div className="scanlines absolute inset-0 opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55))",
            }}
          />

          <div className="relative flex h-full flex-col justify-between p-4 md:p-6">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="gap-1.5 border border-white/20 bg-black/40 text-white">
                  <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
                  LIVE
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/25 bg-black/30 text-white"
                >
                  {settings.quality}
                </Badge>
              </div>
              <Badge
                variant="outline"
                className="border-white/25 bg-black/30 text-white"
              >
                {region?.name} · {region?.pingMs} ms
              </Badge>
            </div>

            <div className="grid justify-items-center gap-3 text-center text-white">
              <p className="text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">
                Simulated stream
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight drop-shadow-lg md:text-6xl">
                {game.title}
              </h1>
              <p className="text-sm text-white/70">
                Press ESC or click Quit to end the session
              </p>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              {settings.showOverlay ? (
                <div className="grid grid-cols-4 gap-6 rounded-lg border border-white/15 bg-black/45 p-3 text-white backdrop-blur-xs">
                  <HudStat
                    label="FPS"
                    value={liveStats.fps ? String(liveStats.fps) : "—"}
                  />
                  <HudStat
                    label="Latency"
                    value={liveStats.latency ? `${liveStats.latency} ms` : "—"}
                  />
                  <HudStat
                    label="Bitrate"
                    value={
                      liveStats.bitrate ? `${liveStats.bitrate} Mbps` : "—"
                    }
                  />
                  <HudStat label="Session" value={formatClock(elapsed)} />
                </div>
              ) : (
                <span />
              )}
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-black/40 text-white hover:bg-black/60 hover:text-white"
                onClick={quit}
              >
                <LogOut data-icon="inline-start" />
                Quit game
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
