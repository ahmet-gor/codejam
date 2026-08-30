import { Reveal } from "@/components/marketing/reveal"
import { SectionHeading } from "@/components/marketing/section-heading"
import { testimonials } from "@/data/testimonials"

export function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Players"
          title="Loved by people who sold their rigs"
          description="A few words from players who stopped waiting for downloads."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.1}>
              <figure className="h-full rounded-xl border border-border/60 bg-card p-6">
                <blockquote className="mb-5 text-pretty text-sm leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.handle}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
