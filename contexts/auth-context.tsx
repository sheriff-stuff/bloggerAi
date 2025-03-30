"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Only initialize Supabase on the client side
  const supabase = typeof window !== "undefined" ? createClient() : null

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === "undefined" || !supabase) return

    console.log("AuthProvider: Initializing")

    const getUser = async () => {
      try {
        console.log("AuthProvider: Getting user")
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          // Handle "Auth session missing!" error gracefully
          if (error.message.includes("session missing")) {
            console.log("AuthProvider: No session found, user is not logged in")
            setUser(null)
          } else {
            console.error("AuthProvider: Error getting user", error)
            setUser(null)
          }
        } else {
          console.log("AuthProvider: User found", user ? "User exists" : "No user")
          setUser(user)
        }
      } catch (error) {
        console.error("AuthProvider: Error getting user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Set up auth state change listener
    let subscription: { unsubscribe: () => void } | null = null

    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log("AuthProvider: Auth state changed", _event, session ? "Session exists" : "No session")
        setUser(session?.user ?? null)
        setLoading(false)
      })

      subscription = data.subscription
    } catch (error) {
      console.error("AuthProvider: Error setting up auth state change listener", error)
      setLoading(false)
    }

    return () => {
      if (subscription) {
        console.log("AuthProvider: Cleaning up subscription")
        subscription.unsubscribe()
      }
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      console.error("AuthProvider: Supabase client not initialized")
      return { error: new Error("Supabase client not initialized") }
    }

    try {
      console.log("AuthProvider: Signing in")
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("AuthProvider: Sign in error", error)
      } else {
        console.log("AuthProvider: Sign in successful")
        router.refresh()
      }

      return { error }
    } catch (error) {
      console.error("AuthProvider: Sign in error:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    if (!supabase) {
      console.error("AuthProvider: Supabase client not initialized")
      return { error: new Error("Supabase client not initialized") }
    }

    try {
      console.log("AuthProvider: Signing up")
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })

      if (error) {
        console.error("AuthProvider: Sign up error", error)
      } else {
        console.log("AuthProvider: Sign up successful")
      }

      return { error }
    } catch (error) {
      console.error("AuthProvider: Sign up error:", error)
      return { error: error as any }
    }
  }

  const signOut = async () => {
    if (!supabase) {
      console.error("AuthProvider: Supabase client not initialized")
      return
    }

    try {
      console.log("AuthProvider: Signing out")
      await supabase.auth.signOut()
      console.log("AuthProvider: Sign out successful")
      setUser(null)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("AuthProvider: Sign out error:", error)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

