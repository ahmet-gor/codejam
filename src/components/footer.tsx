import Link from "next/link"
import { Logo } from "@/components/logo"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Game library", href: "/games" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/pricing#faq" },
      { label: "Server status", href: "#" },
      { label: "Supported devices", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="grid gap-3">
          <Logo />
          <p className="max-w-56 text-sm text-muted-foreground">
            AAA gaming on any screen. No downloads, no patches, no hardware.
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500" />
            All 8 regions operational
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="grid content-start gap-3">
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="grid gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground">
          <span>© 2026 AmberStream. A demo experience.</span>
          <span>Built for Codejam</span>
        </div>
      </div>
    </footer>
  )
}
