import "./globals.css"

import React, { ReactNode } from "react"

import { server } from "@/mock"

export const metadata = {
  title: "一流レシピ",
}

type RootLayoutProps = {
  children: ReactNode
}

if (process.env.NODE_ENV === "development") {
  server.listen()
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
