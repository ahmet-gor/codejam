"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Gamepad2,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type EggId =
  | "konami"
  | "crt"
  | "god"
  | "idkfa"
  | "amber"
  | "clicker"
  | "ping"
  | "charmer"

const EGGS: Record<EggId, { name: string; hint: string }> = {
  konami: { name: "Old School", hint: "The Konami code still works here." },
  crt: { name: "Phosphor Fiend", hint: "Scanlines: back by popular demand." },
  god: { name: "IDDQD", hint: "God mode. Latency is now 0 ms, emotionally." },
  idkfa: { name: "IDKFA", hint: "All the cheats. None of the guns." },
  amber: { name: "Certified Amber Enjoyer", hint: "You said the magic word." },
  clicker: { name: "Turbo Clicker", hint: "Seven clicks. StarCraft APM energy." },
  ping: { name: "Ping Whisperer", hint: "You poked the status dot. It didn't flinch." },
  charmer: { name: "Snake Charmer", hint: "15+ points in AmberSnake. Slither on." },
}

const STORAGE_KEY = "amberstream-eggs"

type EggState = { unlocked: EggId[]; crt: boolean }

function readEggs(): EggState {
  if (typeof window === "undefined") return { unlocked: [], crt: false }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<EggState>
      return {
        unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
        crt: !!parsed.crt,
      }
    }
  } catch {}
  return { unlocked: [], crt: false }
}

function writeEggs(state: EggState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function unlock(id: EggId) {
  const state = readEggs()
  if (state.unlocked.includes(id)) return false
  state.unlocked.push(id)
  writeEggs(state)
  const egg = EGGS[id]
  const total = Object.keys(EGGS).length
  toast(`Achievement unlocked — ${egg.name}`, {
    description: `${egg.hint} · ${state.unlocked.length}/${total} secrets found`,
    icon: <Trophy className="size-4 text-primary" />,
  })
  return true
}

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
]

const STATUS_QUIPS = [
  "All 8 regions operational. The 9th is… none of your business.",
  "Ping unchanged: 9 ms. The dot remains unbothered.",
  "Region check complete. Still amber, still streaming.",
  "Please stop poking the infrastructure.",
]

const GRID = 15
const CELL = 20
const SIZE = GRID * CELL

type Vec = { x: number; y: number }

function randomFood(snake: Vec[]): Vec {
  const free: Vec[] = []
  for (let x = 0; x < GRID; x++) {
    for (let y = 0; y < GRID; y++) {
      if (!snake.some((s) => s.x === x && s.y === y)) free.push({ x, y })
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 }
}

function freshGame() {
  return {
    snake: [
      { x: 7, y: 7 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
    ] as Vec[],
    dir: { x: 1, y: 0 } as Vec,
    queued: { x: 1, y: 0 } as Vec,
    food: randomFood([
      { x: 7, y: 7 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
    ]),
    alive: false,
  }
}

function SnakeGame({ onHighScore }: { onHighScore: () => void }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const gameRef = React.useRef(freshGame())
  const scoreRef = React.useRef(0)
  const [score, setScore] = React.useState(0)
  const [best, setBest] = React.useState(0)
  const [phase, setPhase] = React.useState<"idle" | "running" | "dead">("idle")

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("amberstream-snake-best")
      if (raw) setBest(Number(raw) || 0)
    } catch {}
  }, [])

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const g = gameRef.current

    ctx.fillStyle = "#0c0a09"
    ctx.fillRect(0, 0, SIZE, SIZE)

    ctx.fillStyle = "#292524"
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2)
      }
    }

    const { food } = g
    ctx.fillStyle = "#f43f5e"
    ctx.beginPath()
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, 7, 0, Math.PI * 2)
    ctx.fill()

    g.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#fbbf24" : "#f59e0b"
      const pad = i === 0 ? 1 : 2
      ctx.beginPath()
      ctx.roundRect(
        seg.x * CELL + pad,
        seg.y * CELL + pad,
        CELL - pad * 2,
        CELL - pad * 2,
        5
      )
      ctx.fill()
    })
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.scale(dpr, dpr)
    draw()
  }, [draw])

  const step = React.useCallback(() => {
    const g = gameRef.current
    if (!g.alive) return
    g.dir = g.queued
    const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }
    const hitWall =
      head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID
    const hitSelf = g.snake.some((s) => s.x === head.x && s.y === head.y)
    if (hitWall || hitSelf) {
      g.alive = false
      setPhase("dead")
      const final = scoreRef.current
      setBest((b) => {
        if (final > b) {
          try {
            localStorage.setItem("amberstream-snake-best", String(final))
          } catch {}
          return final
        }
        return b
      })
      if (final >= 15) onHighScore()
      if (final > 0) {
        toast(`AmberSnake — scored ${final}`, {
          description: "Enter to run it back.",
          icon: <Gamepad2 className="size-4 text-primary" />,
        })
      }
      return
    }
    g.snake.unshift(head)
    if (head.x === g.food.x && head.y === g.food.y) {
      scoreRef.current += 1
      setScore(scoreRef.current)
      g.food = randomFood(g.snake)
    } else {
      g.snake.pop()
    }
    draw()
  }, [draw, onHighScore])

  React.useEffect(() => {
    if (phase !== "running") return
    const speed = Math.max(70, 140 - score * 4)
    const id = setInterval(step, speed)
    return () => clearInterval(id)
  }, [phase, score, step])

  const start = React.useCallback(
    (dir: Vec) => {
      const g = gameRef.current
      if (!g.alive) {
        Object.assign(gameRef.current, freshGame())
        gameRef.current.queued = dir
        scoreRef.current = 0
        setScore(0)
        gameRef.current.alive = true
        setPhase("running")
        draw()
        return
      }
      if (dir.x === -g.dir.x && dir.y === -g.dir.y) return
      if (dir.x === g.queued.x && dir.y === g.queued.y) return
      g.queued = dir
    },
    [draw]
  )

  const reset = React.useCallback(() => {
    Object.assign(gameRef.current, freshGame())
    scoreRef.current = 0
    setScore(0)
    setPhase("idle")
    draw()
  }, [draw])

  React.useEffect(() => {
    const map: Record<string, Vec> = {
      arrowup: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 },
    }
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const dir = map[key]
      if (dir) {
        e.preventDefault()
        start(dir)
      }
      if (
        phase === "dead" &&
        (key === "enter" || key === " " || key === "r")
      ) {
        e.preventDefault()
        start({ x: 1, y: 0 })
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [phase, start])

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Score <span className="font-medium text-foreground tabular-nums">{score}</span>
        </span>
        <span>
          Best <span className="font-medium text-foreground tabular-nums">{best}</span>
        </span>
      </div>
      <div className="relative mx-auto w-fit">
        <canvas
          ref={canvasRef}
          style={{ width: SIZE, height: SIZE }}
          className="max-w-full rounded-lg ring-1 ring-border"
          aria-label="AmberSnake game board"
        />
        {phase !== "running" && (
          <div className="absolute inset-0 grid place-items-center rounded-lg bg-background/80 text-center backdrop-blur-xs">
            <div className="grid gap-1 p-4">
              <p className="font-medium">
                {phase === "idle" ? "AmberSnake" : "Game over"}
              </p>
              <p className="text-xs text-muted-foreground">
                {phase === "idle"
                  ? "Press an arrow key or WASD to slither"
                  : "Enter or any arrow to run it back"}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto mt-3 grid w-fit grid-cols-3 gap-1">
        <span />
        <Button variant="outline" size="icon-sm" aria-label="Up" onClick={() => start({ x: 0, y: -1 })}>
          <ChevronUp />
        </Button>
        <span />
        <Button variant="outline" size="icon-sm" aria-label="Left" onClick={() => start({ x: -1, y: 0 })}>
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Down" onClick={() => start({ x: 0, y: 1 })}>
          <ChevronDown />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Right" onClick={() => start({ x: 1, y: 0 })}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export function EasterEggs() {
  const [snakeOpen, setSnakeOpen] = React.useState(false)
  const [godMode, setGodMode] = React.useState(false)
  const snakeOpenRef = React.useRef(false)

  React.useEffect(() => {
    snakeOpenRef.current = snakeOpen
  }, [snakeOpen])

  React.useEffect(() => {
    const state = readEggs()
    if (state.crt) document.body.classList.add("egg-crt")
  }, [])

  React.useEffect(() => {
    let seq: string[] = []
    let word = ""

    const isTyping = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      !!target.closest(
        'input, textarea, select, [contenteditable="true"], [contenteditable=""]'
      )

    const toggleCrt = () => {
      const state = readEggs()
      state.crt = !state.crt
      writeEggs(state)
      document.body.classList.toggle("egg-crt", state.crt)
      if (state.crt) {
        unlock("crt")
        toast("CRT mode engaged", {
          description: "Scanlines warmed up. Type crt again for modern panels.",
          icon: <Sparkles className="size-4 text-primary" />,
        })
      } else {
        toast("CRT mode off", {
          description: "Back to OLED blacks.",
          icon: <Sparkles className="size-4 text-primary" />,
        })
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return
      const key = e.key.toLowerCase()

      seq.push(key)
      if (seq.length > KONAMI.length) seq = seq.slice(-KONAMI.length)
      if (!snakeOpenRef.current && seq.join(",") === KONAMI.join(",")) {
        seq = []
        unlock("konami")
        toast("AmberSnake booted from firmware", {
          description: "Every GPU node ships with it. Arrows or WASD.",
          icon: <Gamepad2 className="size-4 text-primary" />,
        })
        setSnakeOpen(true)
        return
      }

      if (/^[a-z]$/.test(key)) {
        word = (word + key).slice(-8)
        if (word.endsWith("crt")) {
          word = ""
          toggleCrt()
        } else if (word.endsWith("iddqd")) {
          word = ""
          setGodMode((g) => {
            if (!g) unlock("god")
            return !g
          })
        } else if (word.endsWith("idkfa")) {
          word = ""
          unlock("idkfa")
          toast("IDKFA", {
            description: "Ammo, armor… but no keys to the GPU cluster, sorry.",
            icon: <Zap className="size-4 text-primary" />,
          })
        } else if (word.endsWith("amber")) {
          word = ""
          unlock("amber")
          toast("Secret ingredient found", {
            description: "It was amber all along.",
            icon: <Sparkles className="size-4 text-primary" />,
          })
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  React.useEffect(() => {
    let count = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof HTMLElement ? e.target : null
      const logo = el?.closest("[data-egg-logo]")
      if (!logo) return
      count += 1
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => (count = 0), 3500)
      if (count >= 7) {
        count = 0
        const icon = logo.querySelector(":scope > span")
        if (icon) {
          icon.classList.add("egg-spin")
          setTimeout(() => icon.classList.remove("egg-spin"), 900)
        }
        const first = unlock("clicker")
        if (!first) {
          toast("Nice APM", {
            description: "The logo is dizzy now. Happy?",
            icon: <Zap className="size-4 text-primary" />,
          })
        }
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof HTMLElement ? e.target : null
      if (!el?.closest("[data-egg-status]")) return
      unlock("ping")
      toast(STATUS_QUIPS[Math.floor(Math.random() * STATUS_QUIPS.length)], {
        icon: <Gamepad2 className="size-4 text-primary" />,
      })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <>
      {godMode && (
        <div
          aria-hidden
          className="animate-pulse pointer-events-none fixed inset-0 z-[70]"
          style={{
            boxShadow:
              "inset 0 0 120px 8px color-mix(in oklab, var(--primary) 26%, transparent)",
          }}
        />
      )}
      <Dialog open={snakeOpen} onOpenChange={setSnakeOpen}>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader>
            <DialogTitle>AmberSnake v0.9</DialogTitle>
            <DialogDescription>
              Bundled with every GPU node&apos;s firmware since 1987.
            </DialogDescription>
          </DialogHeader>
          <SnakeGame onHighScore={() => unlock("charmer")} />
        </DialogContent>
      </Dialog>
    </>
  )
}
