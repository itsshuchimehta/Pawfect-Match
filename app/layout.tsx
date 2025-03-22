/**
 * Pawfect Match - Dog Adoption Platform
 * A responsive web application for browsing and matching with adoptable dogs
 *
 * Developed by: itsshuchimehta (https://github.com/itsshuchimehta)
 *
 * Features:
 * - Dog browsing with filtering by breed, age, and location
 * - Favoriting system with match generation
 * - Responsive design for all device sizes
 * - Accessibility considerations
 */

import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import ClientLayout from "./ClientLayout"
import "../styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Pawfect Match",
  description: "Find your perfect furry friend and give them a forever home.",
  icons: {
    icon: "./favicon.ico",
    apple: "./apple-touch-icon.png",
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans flex flex-col min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

