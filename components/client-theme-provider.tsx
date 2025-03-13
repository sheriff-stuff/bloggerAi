"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // We're completely disabling SSR for this component
  // This ensures theme-related code only runs on the client
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}

