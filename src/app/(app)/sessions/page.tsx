"use client"

import * as React from "react"
import Link from "next/link"
import { History, Play, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { GameCover } from "@/components/games/game-cover"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getGame } from "@/data/games"
import { formatDateTime, formatDuration } from "@/lib/format"
import { useApp } from "@/lib/store"

function SessionsContent() {
  const { sessions, clearSessions } = useApp()

  const totalSec = sessions.reduce((acc, s) => acc + s.durationSec, 0)
  const avgLatency =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((acc, s) => acc + s.avgLatencyMs, 0) / sessions.length
        )
      : null

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Session history
          </h2>
          <p className="text-sm text-muted-foreground">
            {sessions.length === 0
              ? "Your finished streams will be listed here."
              : `${sessions.length} session${sessions.length === 1 ? "" : "s"} · ${formatDuration(totalSec)} total${avgLatency !== null ? ` · ${avgLatency} ms avg latency` : ""}`}
          </p>
        </div>
        {sessions.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Trash2 data-icon="inline-start" />
                Clear history
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear session history?</DialogTitle>
                <DialogDescription>
                  This permanently removes all {sessions.length} recorded
                  session{sessions.length === 1 ? "" : "s"}. Your library and
                  settings are not affected.
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
        )}
      </div>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="grid place-items-center gap-3 py-16 text-center">
            <History className="size-8 text-muted-foreground" />
            <p className="font-medium">No sessions yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Launch a game and play for a bit — when you quit, the session
              lands here with its stats.
            </p>
            <Button asChild>
              <Link href="/games">
                <Play data-icon="inline-start" />
                Browse games
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card size="sm" className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead className="text-right">Avg latency</TableHead>
                <TableHead className="text-right">Avg FPS</TableHead>
                <TableHead className="w-0" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => {
                const game = getGame(session.gameSlug)
                return (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {game && (
                          <GameCover game={game} className="w-8 rounded-md" />
                        )}
                        <span className="font-medium">
                          {game?.title ?? session.gameSlug}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(session.startedAt)}
                    </TableCell>
                    <TableCell>{formatDuration(session.durationSec)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {session.quality}
                    </TableCell>
                    <TableCell className="text-right">
                      {session.avgLatencyMs} ms
                    </TableCell>
                    <TableCell className="text-right">
                      {session.avgFps}
                    </TableCell>
                    <TableCell>
                      <Button size="icon-sm" variant="ghost" asChild>
                        <Link
                          href={`/play/${session.gameSlug}`}
                          aria-label={`Play ${game?.title ?? session.gameSlug} again`}
                        >
                          <Play />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}

export default function SessionsPage() {
  return (
    <AppShell title="Sessions">
      <SessionsContent />
    </AppShell>
  )
}
