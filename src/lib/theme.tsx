"use client"

import * as React from "react"

type Theme = "dark" | "light"

const STORAGE_KEY = "amberstream-theme"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("dark")

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === "light" || stored === "dark") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(stored)
      }
    } catch {}
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }, [])

  const toggle = React.useCallback(() => {
    setThemeState((current) => {
      const next = current === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {}
      return next
    })
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle]
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return ctx
}

export const themeInitScript = `try{var t=localStorage.getItem("amberstream-theme");if(t!=="light"){document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}`
