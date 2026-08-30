import { Activity } from "lucide-react"
import { SectionHeading } from "@/components/marketing/section-heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { regions } from "@/data/regions"

export const metadata = {
  title: "Server status",
  description: "Live availability and latency for all AmberStream regions.",
}

export default function StatusPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <SectionHeading
        eyebrow="Status"
        title="All systems go"
        description="Live availability and median latency across our eight GPU regions."
      />

      <div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-2 text-sm text-muted-foreground">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
        </span>
        All 8 regions operational
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {regions.map((region) => (
          <Card key={region.id}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">{region.name}</CardTitle>
              <Badge variant="secondary" className="gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Operational
              </Badge>
            </CardHeader>
            <CardContent className="grid gap-3">
              <p className="text-sm text-muted-foreground">{region.location}</p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${Math.max(20, 100 - region.pingMs * 2.5)}%` }}
                  />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium tabular-nums">
                  <Activity className="size-3.5 text-primary" />
                  {region.pingMs} ms
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
