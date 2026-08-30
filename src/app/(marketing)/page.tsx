import { Cta } from "@/components/marketing/cta"
import { FeaturedGames } from "@/components/marketing/featured-games"
import { Features } from "@/components/marketing/features"
import { Hero } from "@/components/marketing/hero"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { PricingTeaser } from "@/components/marketing/pricing-teaser"
import { Testimonials } from "@/components/marketing/testimonials"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedGames />
      <HowItWorks />
      <Features />
      <PricingTeaser />
      <Testimonials />
      <Cta />
    </>
  )
}
