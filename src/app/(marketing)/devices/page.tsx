import {
  Gamepad2,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
  Tv,
} from "lucide-react"
import { Reveal } from "@/components/marketing/reveal"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Supported devices",
  description: "Play AmberStream on browsers, phones, tablets, laptops and TVs.",
}

const devices = [
  {
    icon: Globe,
    title: "Web browsers",
    items: [
      "Chrome, Edge and Firefox (latest two versions)",
      "Safari 17+ on macOS and iOS",
      "Hardware-accelerated streaming, no extensions",
    ],
  },
  {
    icon: Laptop,
    title: "Laptops & desktops",
    items: [
      "Any machine with a wired or 5 GHz Wi-Fi connection",
      "Windows, macOS, Linux and ChromeOS",
      "Keyboard/mouse or controller input",
    ],
  },
  {
    icon: Smartphone,
    title: "Phones",
    items: [
      "iOS 16+ and Android 10+",
      "On-screen controls or paired gamepad",
      "720p60 adaptive stream tuned for mobile",
    ],
  },
  {
    icon: Tablet,
    title: "Tablets",
    items: [
      "iPad 9th gen and newer, Android tablets",
      "Up to 1080p60 on eligible plans",
      "Full controller support via Bluetooth",
    ],
  },
  {
    icon: Tv,
    title: "Smart TVs & sticks",
    items: [
      "Chromecast with Google TV, Fire TV Stick 4K",
      "Apple TV via AirPlay and native app",
      "4K HDR streaming on Pro plans",
    ],
  },
  {
    icon: Gamepad2,
    title: "Controllers",
    items: [
      "Xbox Wireless, DualSense and DualShock 4",
      "Switch Pro and most Bluetooth gamepads",
      "Remappable buttons in settings",
    ],
  },
]

const requirements = [
  { label: "Minimum", value: "15 Mbps · 720p60" },
  { label: "Recommended", value: "35 Mbps · 1080p60" },
  { label: "4K HDR", value: "50 Mbps · 2160p up to 120 FPS" },
]

export default function DevicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <SectionHeading
        eyebrow="Devices"
        title="Play on whatever's in front of you"
        description="AmberStream runs in the browser and on the big screen — your library follows."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device, i) => (
          <Reveal key={device.title} delay={(i % 3) * 0.08}>
            <div className="h-full rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40">
              <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <device.icon className="size-5" />
              </span>
              <h3 className="mb-3 font-medium">{device.title}</h3>
              <ul className="grid gap-2">
                {device.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <Monitor className="mt-0.5 size-3.5 shrink-0 text-primary/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-16">
        <SectionHeading title="Connection requirements" />
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {requirements.map((req) => (
            <div
              key={req.label}
              className="rounded-xl border border-border/60 bg-card p-6 text-center"
            >
              <Badge variant="secondary" className="mb-3">{req.label}</Badge>
              <p className="text-sm font-medium">{req.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
