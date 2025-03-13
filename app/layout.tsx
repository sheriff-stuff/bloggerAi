import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blogger AI - Automated Blog Generation SaaS",
  description: "AI-powered blog generation for businesses. Boost your SEO with automated, high-quality content.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* ThemeProvider is now imported in the client component */}
        <ClientThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ClientThemeProvider>
      </body>
    </html>
  )
}

// Import the client component using next dynamic import with ssr disabled
import dynamic from "next/dynamic"

const ClientThemeProvider = dynamic(
  () => import("@/components/client-theme-provider").then((mod) => mod.ClientThemeProvider)
  // { ssr: false }, // This ensures the component only renders on the client
)
