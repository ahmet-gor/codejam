"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bookmark,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react"
import { toast } from "sonner"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { initialsOf } from "@/lib/format"
import { useApp } from "@/lib/store"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/games", label: "Games" },
  { href: "/pricing", label: "Pricing" },
]

function UserMenu() {
  const { user, signOut } = useApp()
  const router = useRouter()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Account menu">
          <Avatar size="sm">
            <AvatarFallback className="bg-primary/15 text-primary">
              {initialsOf(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm text-foreground">{user.name}</span>
          <span className="font-normal">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <LayoutDashboard />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/library")}>
          <Bookmark />
          Library
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/sessions")}>
          <History />
          Sessions
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            signOut()
            toast("Signed out", { description: "See you next run." })
            router.push("/")
          }}
        >
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const { user, ready } = useApp()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-4">
        <Logo />

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname.startsWith(link.href) &&
                  "bg-muted text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          {ready && user ? (
            <UserMenu />
          ) : (
            <div className="hidden items-center gap-1.5 sm:flex">
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Get started
                  <Users data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <Link
                    href="/dashboard"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                )}
              </nav>
              <div className="mt-auto grid gap-2 p-4">
                {user ? (
                  <Button variant="outline" asChild>
                    <Link href="/settings">Settings</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link href="/signin">Sign in</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup">Get started free</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
