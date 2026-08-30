"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

export type User = {
  name: string
  email: string
}

export type StreamQuality = "720p60" | "1080p60" | "1440p60" | "4K60"

export type StreamSession = {
  id: string
  gameSlug: string
  startedAt: string
  durationSec: number
  quality: string
  avgLatencyMs: number
  avgFps: number
}

export type Settings = {
  displayName: string
  region: string
  quality: StreamQuality
  showOverlay: boolean
}

const STORAGE_KEY = "amberstream-state"

const defaultSettings: Settings = {
  displayName: "",
  region: "eu-central",
  quality: "1080p60",
  showOverlay: true,
}

type AppState = {
  user: User | null
  library: string[]
  sessions: StreamSession[]
  settings: Settings
}

const defaultState: AppState = {
  user: null,
  library: [],
  sessions: [],
  settings: defaultSettings,
}

type AppContextValue = {
  ready: boolean
  user: User | null
  library: string[]
  sessions: StreamSession[]
  settings: Settings
  signIn: (name: string, email: string) => void
  signOut: () => void
  toggleLibrary: (slug: string) => void
  addSession: (session: Omit<StreamSession, "id">) => void
  clearSessions: () => void
  updateSettings: (patch: Partial<Settings>) => void
}

const AppContext = React.createContext<AppContextValue | null>(null)

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>
      return {
        user: parsed.user ?? null,
        library: Array.isArray(parsed.library) ? parsed.library : [],
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
        settings: { ...defaultSettings, ...(parsed.settings ?? {}) },
      }
    }
  } catch {}
  return defaultState
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>(defaultState)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState())
    setReady(true)
  }, [])

  React.useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state, ready])

  const signIn = React.useCallback((name: string, email: string) => {
    setState((s) => ({
      ...s,
      user: { name, email },
      settings: { ...s.settings, displayName: s.settings.displayName || name },
    }))
  }, [])

  const signOut = React.useCallback(() => {
    setState((s) => ({ ...s, user: null }))
  }, [])

  const toggleLibrary = React.useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      library: s.library.includes(slug)
        ? s.library.filter((x) => x !== slug)
        : [...s.library, slug],
    }))
  }, [])

  const addSession = React.useCallback(
    (session: Omit<StreamSession, "id">) => {
      setState((s) => ({
        ...s,
        sessions: [{ ...session, id: crypto.randomUUID() }, ...s.sessions].slice(
          0,
          50
        ),
      }))
    },
    []
  )

  const clearSessions = React.useCallback(() => {
    setState((s) => ({ ...s, sessions: [] }))
  }, [])

  const updateSettings = React.useCallback((patch: Partial<Settings>) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
  }, [])

  const value = React.useMemo(
    () => ({
      ready,
      ...state,
      signIn,
      signOut,
      toggleLibrary,
      addSession,
      clearSessions,
      updateSettings,
    }),
    [
      ready,
      state,
      signIn,
      signOut,
      toggleLibrary,
      addSession,
      clearSessions,
      updateSettings,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = React.useContext(AppContext)
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return ctx
}

export function useRequireAuth() {
  const { user, ready } = useApp()
  const router = useRouter()

  React.useEffect(() => {
    if (ready && !user) {
      router.replace("/signin")
    }
  }, [ready, user, router])

  return { user, ready }
}
