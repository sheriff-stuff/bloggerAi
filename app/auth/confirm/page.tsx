"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function ConfirmPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const supabase = createClient()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        if (!token_hash || !type) {
          setError("Missing confirmation parameters")
          setIsLoading(false)
          return
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as any,
        })

        if (error) {
          setError(error.message)
          setIsSuccess(false)
        } else {
          setIsSuccess(true)
        }
      } catch (err) {
        console.error("Confirmation error:", err)
        setError("An unexpected error occurred during confirmation")
        setIsSuccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    handleEmailConfirmation()
  }, [token_hash, type, supabase.auth])

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Email Confirmation</CardTitle>
          <CardDescription className="text-center">
            {isLoading
              ? "Verifying your email address..."
              : isSuccess
                ? "Your email has been confirmed!"
                : "Confirmation failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {isLoading ? (
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          ) : isSuccess ? (
            <CheckCircle className="h-16 w-16 text-green-500" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500" />
          )}

          <div className="mt-6 text-center">
            {isLoading ? (
              <p>Please wait while we verify your email address...</p>
            ) : isSuccess ? (
              <p>Thank you for confirming your email address. You can now log in to your account.</p>
            ) : (
              <p className="text-red-500">{error || "There was a problem confirming your email address."}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isLoading && (
            <Button asChild>
              <Link href={isSuccess ? "/dashboard" : "/login"}>{isSuccess ? "Go to Dashboard" : "Back to Login"}</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

