export type Plan = {
  id: string
  name: string
  monthly: number
  yearly: number
  tagline: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    yearly: 0,
    tagline: "Try the platform, no card required",
    features: [
      "720p · 60 FPS streaming",
      "1 hour of play per day",
      "50+ indie favorites",
      "Standard queue access",
    ],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 12.99,
    yearly: 10.39,
    tagline: "The full library, unlimited",
    features: [
      "1080p · 60 FPS streaming",
      "Unlimited sessions",
      "Full library · 50+ games",
      "Cloud saves & progression",
      "Priority GPU queue",
    ],
    highlighted: true,
    cta: "Go Pro",
  },
  {
    id: "elite",
    name: "Elite",
    monthly: 24.99,
    yearly: 19.99,
    tagline: "Maximum fidelity, zero compromise",
    features: [
      "4K HDR · up to 120 FPS",
      "Ultra GPU nodes",
      "Exclusive betas & early access",
      "2 simultaneous streams",
      "Elite support channel",
    ],
    cta: "Go Elite",
  },
]

export type BillingPeriod = "monthly" | "yearly"
