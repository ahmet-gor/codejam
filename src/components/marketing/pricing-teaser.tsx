import { PricingCard } from "@/components/marketing/pricing-card"
import { SectionHeading } from "@/components/marketing/section-heading"
import { plans } from "@/data/plans"

export function PricingTeaser() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Pricing"
        title="Start free, upgrade when you're hooked"
        description="Every plan includes the streaming tech. Higher tiers add fidelity, the full library and priority hardware."
      />
      <div className="grid items-start gap-4 md:grid-cols-3">
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} billing="monthly" index={i} />
        ))}
      </div>
    </section>
  )
}
