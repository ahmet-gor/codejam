import { Joystick, Search, UserPlus } from "lucide-react"
import { Reveal } from "@/components/marketing/reveal"
import { SectionHeading } from "@/components/marketing/section-heading"

const steps = [
  {
    icon: UserPlus,
    title: "Create an account",
    text: "Free tier, no card required. You're streaming within a minute.",
  },
  {
    icon: Search,
    title: "Pick a game",
    text: "150+ included titles, or connect Steam and bring your own library.",
  },
  {
    icon: Joystick,
    title: "Press play",
    text: "A GPU node spins up in your region and the stream starts in seconds.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="How it works"
          title="Playing in three steps"
          description="Your device is just a window — the heavy lifting happens in our data centers."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative h-full rounded-xl border border-border/60 bg-card p-6">
                <span className="absolute top-5 right-5 font-heading text-4xl font-black text-primary/15">
                  {i + 1}
                </span>
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </span>
                <h3 className="mb-1.5 font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
