"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [redirectAttempted, setRedirectAttempted] = useState(false)

  useEffect(() => {
    // Only redirect if we're not loading, there's no user, and we haven't attempted to redirect yet
    if (!loading && !user && !redirectAttempted) {
      console.log("ProtectedRoute: No user found, redirecting to login")
      setRedirectAttempted(true)
      const redirectPath = `/login?redirect=${encodeURIComponent(pathname)}`
      router.push(redirectPath)
    }
  }, [user, loading, router, pathname, redirectAttempted])

  // Show loading state while we're checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading authentication state...</span>
      </div>
    )
  }

  // If we're not loading and there's no user, show a message
  if (!user) {
    if (redirectAttempted) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Redirecting to login...</span>
        </div>
      )
    }
    return null
  }

  // If we have a user, render the children
  return <>{children}</>
}

