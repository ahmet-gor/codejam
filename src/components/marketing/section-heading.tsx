import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto mb-10 grid max-w-2xl gap-3 text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
