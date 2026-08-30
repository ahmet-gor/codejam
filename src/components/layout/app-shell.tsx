"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bookmark,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Menu,
} from "lucide-react"
import { toast } from "sonner"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { getRegion } from "@/data/regions"
import { initialsOf } from "@/lib/format"
import { useApp, useRequireAuth } from "@/lib/store"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/library", label: "Library", icon: Bookmark },
  { href: "/sessions", label: "Sessions", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            pathname === item.href && "bg-muted text-foreground"
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export function AppShell({
  title,
  actions,
  children,
}: {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const { user, ready } = useRequireAuth()
  const { settings, signOut } = useApp()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const region = getRegion(settings.region)

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col gap-6 border-r border-border/60 bg-background/60 px-4 py-5 md:flex">
        <Logo />
        <NavLinks />
        <div className="mt-auto grid gap-3">
          {user && (
            <div className="flex items-center gap-2.5 rounded-lg border border-border/60 p-3">
              <Avatar size="sm">
                <AvatarFallback className="bg-primary/15 text-primary">
                  {initialsOf(settings.displayName || user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1">
                <span className="truncate text-sm font-medium">
                  {settings.displayName || user.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Sign out"
                onClick={() => {
                  signOut()
                  toast("Signed out", { description: "See you next run." })
                  router.push("/")
                }}
              >
                <LogOut />
              </Button>
            </div>
          )}
          <div className="rounded-lg border border-border/60 p-3 text-xs text-muted-foreground">
            <p className="mb-1 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {region ? `${region.name} · ${region.pingMs} ms` : "Connected"}
            </p>
            Streaming at {settings.quality}
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col md:pl-60">
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="flex h-14 items-center gap-3 px-4">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4">
                  <NavLinks onNavigate={() => setMenuOpen(false)} />
                </div>
                <div className="mt-auto p-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/">Back to site</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="font-heading text-lg font-semibold">{title}</h1>
            {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
            {!actions && (
              <div className="ml-auto flex items-center gap-1.5">
                <ThemeToggle />
                {ready && user && (
                  <Avatar size="sm">
                    <AvatarFallback className="bg-primary/15 text-primary">
                      {initialsOf(settings.displayName || user.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {!ready || !user ? (
            <div className="grid gap-4">
              <Skeleton className="h-24 w-full" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full" />
                ))}
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}
