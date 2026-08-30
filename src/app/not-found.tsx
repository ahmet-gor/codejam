import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="grid flex-1 place-items-center px-4 py-24">
      <div className="grid justify-items-center gap-5 text-center">
        <Logo />
        <Gamepad2 className="size-10 text-muted-foreground" />
        <div className="grid gap-2">
          <h1 className="font-heading text-2xl font-semibold">
            This page left the lobby
          </h1>
          <p className="max-w-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or was moved to
            another region.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/games">Browse games</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
