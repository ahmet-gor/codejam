import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({
  href = "/",
  className,
}: {
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 font-semibold", className)}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-primary/30">
        <Gamepad2 className="size-4.5 text-white" />
      </span>
      <span className="text-lg tracking-tight">
        Amber<span className="text-gradient">Stream</span>
      </span>
    </Link>
  )
}
