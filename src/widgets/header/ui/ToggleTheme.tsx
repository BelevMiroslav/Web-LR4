"use client"

import { Button } from "@/src/shared/ui"
import { useTheme } from "@teispace/next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (theme === "dark" ? <Sun /> : <Moon />)}
    </Button>
  )
}
