import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/marketing/section-heading"

export const metadata = {
  title: "About",
  description: "AmberStream puts AAA gaming on any screen with no downloads.",
}

const stats = [
  { value: "8", label: "Global regions" },
  { value: "150+", label: "Games in the library" },
  { value: "<20 ms", label: "Median round trip" },
  { value: "4K HDR", label: "Max stream quality" },
]

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <SectionHeading
        eyebrow="About"
        title="Gaming without the gatekeeping"
        description="We started AmberStream because great games shouldn't require a €2,000 rig."
      />

      <div className="mx-auto grid max-w-3xl gap-6 text-pretty text-muted-foreground">
        <p>
          AmberStream runs AAA titles on RTX-class GPU nodes in eight regions
          and streams them to any screen you own. No downloads, no patches, no
          hardware arms race — press play and you're in the game in seconds.
        </p>
        <p>
          We handle the rigs, the drivers and the updates. You handle the fun
          part. Progress is saved to the cloud, so you can pause on the TV and
          resume on the train without missing a frame.
        </p>
        <p>
          This site is a demo experience built for Codejam — but the latency
          numbers, regions and library are modeled after a real cloud gaming
          stack.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/60 bg-card p-6 text-center"
          >
            <p className="font-heading text-2xl font-semibold text-primary">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-3">
        <Button asChild>
          <Link href="/games">Browse the library</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/pricing">See pricing</Link>
        </Button>
      </div>
    </div>
  )
}
