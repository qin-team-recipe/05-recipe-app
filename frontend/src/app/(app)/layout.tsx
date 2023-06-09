import React, { ReactNode } from "react"

import { BottomNavBar, BottomNavItem } from "@/app/(app)/_component/bottomNav"

export const metadata = {
  title: "シェフやレシピを検索",
}

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout(props: MainLayoutProps) {
  const { children } = props

  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="mb-auto mt-0 flex flex-1 flex-col overflow-y-auto px-2">{children}</main>
      <footer className="bg-mauve-app z-10 w-full shadow-base">
        <BottomNavBar>
          <BottomNavItem navLabel="検索" href="/search" />
          <BottomNavItem navLabel="お気に入り" href="/favorite" />
          <BottomNavItem navLabel="お買い物" href="/shopping" />
        </BottomNavBar>
      </footer>
    </div>
  )
}
