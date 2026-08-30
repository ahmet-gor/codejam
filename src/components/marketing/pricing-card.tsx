"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { BillingPeriod, Plan } from "@/data/plans"
import { cn } from "@/lib/utils"

export function PricingCard({
  plan,
  billing,
  index = 0,
}: {
  plan: Plan
  billing: BillingPeriod
  index?: number
}) {
  const price = billing === "monthly" ? plan.monthly : plan.yearly

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={cn(plan.highlighted && "md:-my-2")}
    >
      <Card
        className={cn(
          "h-full",
          plan.highlighted && "ring-2 ring-primary shadow-xl shadow-primary/15"
        )}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-lg">{plan.name}</CardTitle>
            {plan.highlighted && (
              <Badge>
                Most popular
              </Badge>
            )}
          </div>
          <CardDescription>{plan.tagline}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-4xl font-semibold tracking-tight">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              / month{billing === "yearly" && ", billed yearly"}
            </span>
          </div>
          <ul className="grid gap-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant={plan.highlighted ? "default" : "outline"}
            asChild
          >
            <Link href="/signup">{plan.cta}</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
