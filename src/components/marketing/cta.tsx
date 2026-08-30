"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center md:p-16"
      >
        <div className="absolute -top-24 left-1/2 h-64 w-[30rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <div className="relative grid gap-6">
          <h2 className="font-heading mx-auto max-w-xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Your next game is one click away
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Create a free account and be inside a blockbuster in under a minute.
            No card, no commitment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
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
          </div>
        </div>
      </motion.div>
    </section>
  )
}
