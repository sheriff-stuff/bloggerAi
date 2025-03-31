import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// Create a single instance of the Supabase client to be reused
let supabaseClient: SupabaseClient | null = null

export function createClient() {
  // Only create the client in the browser
  if (typeof window === "undefined") {
    console.error("Attempted to create Supabase client on the server")
    // Return a dummy client that will be replaced on the client side
    return null as any
  }

  if (!supabaseClient) {
    try {
      console.log("Creating new Supabase client")

      // Check if environment variables are available
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error("Supabase environment variables are missing")
        throw new Error("Supabase environment variables are missing")
      }

      supabaseClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )
    } catch (error) {
      console.error("Error creating Supabase client:", error)
      throw error
    }
  } else {
    console.log("Reusing existing Supabase client")
  }

  return supabaseClient
}

