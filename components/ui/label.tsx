import type React from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ClientThemeProvider } from "@/components/client-theme-provider"
import { ThemeScript } from "@/components/theme-script"
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
        {/* Add theme script to head to prevent flash of wrong theme */}
        <ThemeScript />
      </head>
      <body className={inter.className} suppressHydrationWarning>
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
