import { SectionHeading } from "@/components/marketing/section-heading"

export const metadata = {
  title: "Privacy",
  description: "How AmberStream handles your data.",
}

const sections = [
  {
    title: "What we collect",
    body: "An email address when you sign up, your save files when you play, and anonymous telemetry about stream quality (bitrate, latency, dropped frames). Nothing else.",
  },
  {
    title: "What we never collect",
    body: "We don't track the other tabs in your browser, we don't sell data to advertisers, and we don't fingerprint your device across the web.",
  },
  {
    title: "Where data lives",
    body: "Saves are stored encrypted in the region closest to you and replicated to one backup region. Account data stays within the EU and US.",
  },
  {
    title: "Deleting your data",
    body: "Deleting your account removes your profile, saves and telemetry within 30 days. You can also export your saves from Settings at any time.",
  },
  {
    title: "Cookies",
    body: "One session cookie to keep you signed in and one theme preference. No ad cookies, because there are no ads.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <SectionHeading
        eyebrow="Legal"
        title="Privacy policy"
        description="The short, readable version — this is a demo experience."
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
