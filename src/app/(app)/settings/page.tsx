"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { regions } from "@/data/regions"
import {
  useApp,
  type Settings,
  type StreamQuality,
} from "@/lib/store"

const qualities: StreamQuality[] = ["720p60", "1080p60", "1440p60", "4K60"]

function SettingsContent() {
  const { settings, updateSettings, clearSessions, signOut, sessions } =
    useApp()
  const router = useRouter()

  const [form, setForm] = React.useState<Settings>(settings)
  const dirty = JSON.stringify(form) !== JSON.stringify(settings)

  const save = () => {
    updateSettings({
      displayName: form.displayName.trim(),
      region: form.region,
      quality: form.quality,
      showOverlay: form.showOverlay,
    })
    toast.success("Settings saved", {
      description: "Changes apply to your next stream.",
    })
  }

  return (
    <div className="grid max-w-2xl gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Streaming profile</CardTitle>
          <CardDescription>
            How AmberStream appears and performs when you press play.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={form.displayName}
              onChange={(e) =>
                setForm((f) => ({ ...f, displayName: e.target.value }))
              }
              placeholder="How we greet you"
            />
          </div>

          <div className="grid gap-2">
            <Label>Region</Label>
            <Select
              value={form.region}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, region: value }))
              }
            >
              <SelectTrigger className="w-full" aria-label="Region">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name} — {region.location} · {region.pingMs} ms
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Stream quality</Label>
            <Select
              value={form.quality}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, quality: value as StreamQuality }))
              }
            >
              <SelectTrigger className="w-full" aria-label="Stream quality">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {qualities.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {quality.replace("60", " · 60 FPS")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
            <div className="grid gap-0.5">
              <Label htmlFor="overlay">Performance overlay</Label>
              <p className="text-xs text-muted-foreground">
                Show FPS, latency and bitrate during streams.
              </p>
            </div>
            <Switch
              id="overlay"
              checked={form.showOverlay}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, showOverlay: checked }))
              }
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-xs text-muted-foreground">
            {dirty ? "You have unsaved changes" : "All changes saved"}
          </p>
          <Button onClick={save} disabled={!dirty}>
            Save changes
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>
            Irreversible actions, use with care.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={sessions.length === 0}>
                <Trash2 data-icon="inline-start" />
                Clear session history
                {sessions.length > 0 && ` (${sessions.length})`}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear session history?</DialogTitle>
                <DialogDescription>
                  This permanently removes all recorded sessions. Your library
                  and settings are not affected.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      clearSessions()
                      toast.success("Session history cleared")
                    }}
                  >
                    Clear everything
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={() => {
              signOut()
              toast("Signed out", { description: "See you next run." })
              router.push("/")
            }}
          >
            <LogOut data-icon="inline-start" />
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <SettingsContent />
    </AppShell>
  )
}
