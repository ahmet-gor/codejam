import {
  CloudUpload,
  Gauge,
  Monitor,
  Smartphone,
  Users,
  Zap,
} from "lucide-react"
import { Reveal } from "@/components/marketing/reveal"
import { SectionHeading } from "@/components/marketing/section-heading"

const features = [
  {
    icon: Zap,
    title: "Instant play",
    text: "No installs, no updates, no launcher roulette. The game is simply there.",
  },
  {
    icon: Gauge,
    title: "Ultra-low latency",
    text: "Sub-20 ms round trips in eight regions. Fast enough for competitive shooters.",
  },
  {
    icon: Monitor,
    title: "4K HDR streaming",
    text: "Up to 4K at 120 FPS with adaptive bitrate that survives spotty Wi-Fi.",
  },
  {
    icon: Smartphone,
    title: "Any device",
    text: "Browser, tablet, phone or TV. Your controller pairs to all of them.",
  },
  {
    icon: CloudUpload,
    title: "Cloud saves",
    text: "Progress follows you across devices — pause on the TV, resume on the train.",
  },
  {
    icon: Users,
    title: "Multiplayer ready",
    text: "Dedicated low-ping routes to major title servers. Your squad won't notice.",
  },
]

export function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Why AmberStream"
        title="Hardware is our problem now"
        description="Everything that used to require a €2,000 rig happens on our side of the wire."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40">
              <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mb-1.5 font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
