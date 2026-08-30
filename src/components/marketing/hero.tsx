"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "150+", label: "Games included" },
  { value: "8", label: "Global regions" },
  { value: "<20ms", label: "Stream latency" },
  { value: "4K", label: "HDR quality" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
      <div className="absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-7 px-4 pt-24 pb-20 text-center md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="gap-1.5 px-3 py-1">
            <Sparkles />
            Cloud gaming · zero downloads
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading max-w-3xl text-5xl font-semibold tracking-tight text-balance md:text-7xl"
        >
          AAA gaming on <span className="text-gradient">any screen</span> you own
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl text-pretty text-lg text-muted-foreground"
        >
          AmberStream runs blockbuster games on our GPUs and beams them to your
          browser in seconds. No downloads, no patches, no console.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" className="h-11 px-5" asChild>
            <Link href="/signup">
              Start playing free
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-11 px-5" asChild>
            <Link href="/games">
              <Play data-icon="inline-start" />
              Browse games
            </Link>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid w-full max-w-2xl grid-cols-2 gap-6 pt-8 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="grid gap-1">
              <dt className="font-heading text-2xl font-semibold text-primary">
                {stat.value}
              </dt>
              <dd className="text-xs text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
