import "./globals.css"

import React, { ReactNode } from "react"

export const metadata = {
  title: "一流レシピ",
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
