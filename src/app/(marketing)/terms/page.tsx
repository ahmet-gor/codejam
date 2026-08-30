import { SectionHeading } from "@/components/marketing/section-heading"

export const metadata = {
  title: "Terms",
  description: "The terms of service for AmberStream.",
}

const sections = [
  {
    title: "Your account",
    body: "Keep your credentials to yourself. You're responsible for what happens in sessions started with your account.",
  },
  {
    title: "Fair use",
    body: "Free plans include one hour of play per day. Automated farming of session time, account sharing and resale of access are off-limits.",
  },
  {
    title: "The games",
    body: "Titles in the library are licensed for streaming while they're listed. Games can rotate out of the catalog; your saves stay available for six months afterwards.",
  },
  {
    title: "Availability",
    body: "We target 99.9% uptime per region. Maintenance windows are announced in-app at least 48 hours ahead.",
  },
  {
    title: "Cancellation",
    body: "Cancel anytime from Settings. You keep Pro features until the end of the billing period, and saves remain accessible on the Free plan.",
  },
]

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <SectionHeading
        eyebrow="Legal"
        title="Terms of service"
        description="The plain-English version — this is a demo experience."
      />
      <div className="mx-auto grid max-w-2xl gap-8">
        {sections.map((section, i) => (
          <section key={section.title} className="grid gap-2">
            <h3 className="font-medium">
              <span className="mr-2 text-primary tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h3>
            <p className="text-sm text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
