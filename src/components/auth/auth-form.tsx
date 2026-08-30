"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp } from "@/lib/store"

function nameFromEmail(email: string) {
  const raw = email.split("@")[0]
  return raw
    .split(/[._-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter()
  const { signIn } = useApp()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const isSignup = mode === "signup"

  const authenticate = (userName: string, userEmail: string) => {
    setLoading(true)
    setTimeout(() => {
      signIn(userName, userEmail)
      toast.success(isSignup ? "Account created" : `Welcome back, ${userName}`, {
        description: isSignup
          ? "Your free Starter plan is active."
          : "Ready to jump back in?",
      })
      router.push("/dashboard")
    }, 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    if (isSignup && !name) return
    authenticate(
      isSignup ? name : nameFromEmail(email) || "Player",
      email
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 py-16">
      <Logo />
      <Card className="w-full">
        <CardHeader className="items-center text-center">
          <CardTitle className="font-heading text-xl">
            {isSignup ? "Create your account" : "Welcome back"}
          </CardTitle>
          <CardDescription>
            {isSignup
              ? "Free Starter plan, no card required."
              : "Sign in to reach your library and sessions."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {isSignup && (
              <div className="grid gap-2">
                <Label htmlFor="name">Display name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ayla Voss"
                  required
                  autoComplete="name"
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 data-icon="inline-start" />}
              {loading
                ? isSignup
                  ? "Creating account…"
                  : "Signing in…"
                : isSignup
                  ? "Create account"
                  : "Sign in"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => authenticate("Demo Player", "demo@amberstream.gg")}
            disabled={loading}
          >
            <Sparkles data-icon="inline-start" />
            Continue as demo player
          </Button>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">
        {isSignup ? "Already have an account? " : "New to AmberStream? "}
        <Link
          href={isSignup ? "/signin" : "/signup"}
          className="font-medium text-primary hover:underline"
        >
          {isSignup ? "Sign in" : "Create one free"}
        </Link>
      </p>
    </div>
  )
}
