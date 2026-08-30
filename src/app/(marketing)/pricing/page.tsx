"use client"

import * as React from "react"
import { Check, Minus } from "lucide-react"
import { PricingCard } from "@/components/marketing/pricing-card"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { faqs } from "@/data/faqs"
import { plans, type BillingPeriod } from "@/data/plans"
import { cn } from "@/lib/utils"

const comparison: {
  label: string
  values: (string | boolean)[]
}[] = [
  { label: "Resolution · frame rate", values: ["720p · 60 FPS", "1080p · 60 FPS", "4K HDR · up to 120 FPS"] },
  { label: "Included games", values: ["50+ indie titles", "150+ full library", "150+ full library & betas"] },
  { label: "Daily play time", values: ["1 hour", "Unlimited", "Unlimited"] },
  { label: "Cloud saves", values: [true, true, true] },
  { label: "Priority GPU queue", values: [false, true, true] },
  { label: "Simultaneous streams", values: ["1", "1", "2"] },
  { label: "Support", values: ["Community", "Standard", "Elite channel"] },
]

export default function PricingPage() {
  const [billing, setBilling] = React.useState<BillingPeriod>("monthly")

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans, serious hardware"
        description="Start free and stay free forever — or unlock the full library and 4K streaming."
      />

      <div className="mb-10 flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm",
            billing === "monthly" ? "font-medium" : "text-muted-foreground"
          )}
        >
          Monthly
        </span>
        <Switch
          checked={billing === "yearly"}
          onCheckedChange={(checked) =>
            setBilling(checked ? "yearly" : "monthly")
          }
          aria-label="Toggle yearly billing"
        />
        <span
          className={cn(
            "text-sm",
            billing === "yearly" ? "font-medium" : "text-muted-foreground"
          )}
        >
          Yearly
        </span>
        <Badge variant="secondary">Save 20%</Badge>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-3">
        {plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} billing={billing} index={i} />
        ))}
      </div>

      <section className="mt-20">
        <SectionHeading title="Compare plans" />
        <div className="overflow-hidden rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Feature</TableHead>
                {plans.map((plan) => (
                  <TableHead key={plan.id} className="text-center">
                    {plan.name}
                    {plan.highlighted && (
                      <Badge variant="secondary" className="ml-1.5">Popular</Badge>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparison.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="text-muted-foreground">
                    {row.label}
                  </TableCell>
                  {row.values.map((value, i) => (
                    <TableCell key={i} className="text-center font-medium">
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="mx-auto size-4 text-primary" />
                        ) : (
                          <Minus className="mx-auto size-4 text-muted-foreground" />
                        )
                      ) : (
                        value
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="faq" className="mt-20 scroll-mt-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything else, our support crew handles in chat — usually within minutes."
        />
        <Accordion type="single" collapsible className="mx-auto max-w-2xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}
