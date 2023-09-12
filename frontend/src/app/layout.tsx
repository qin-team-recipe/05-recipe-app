import "./globals.css"

import React, { ReactNode } from "react"
import { Zen_Antique } from "next/font/google"

export const metadata = {
  title: "一流レシピ",
}
const zenAntique = Zen_Antique({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-zen-antique",
  weight: "400",
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html className={zenAntique.variable} lang="ja">
      <body>{children}</body>
    </html>
  )
}
