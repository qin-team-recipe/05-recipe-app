import React, { ReactNode } from "react"
import Link from "next/link"

import {
  BottomNavBar,
  BottomNavItem,
} from "@/app/(app)/_component/bottomNav"

export const metadata = {
  title: "シェフやレシピを検索",
}

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout(props: MainLayoutProps) {
  const { children } = props

  return (
    <div className="mx-auto flex min-h-screen flex-col-reverse sm:max-w-2xl sm:flex-row sm:gap-x-3 sm:px-4 sm:pl-6">
      <nav className="bg-mauve-app fixed bottom-0 z-50 w-full shadow-base sm:sticky sm:bottom-auto sm:top-0 sm:w-auto sm:self-start sm:shadow-none">
        <div className="hidden py-6 sm:block sm:pl-3">
          <Link href="/search">ロゴ</Link>
        </div>
        <BottomNavBar>
          <BottomNavItem navLabel="さがす" href="/search" />
          <BottomNavItem navLabel="お気に入り" href="/favorite" />
          <BottomNavItem navLabel="お買い物リスト" href="/shopping" />
        </BottomNavBar>
      </nav>
      <main className="sm:border-x-1 mb-auto mt-0 flex flex-1 flex-col overflow-y-auto sm:border sm:border-y-0 sm:border-solid sm:border-mauve-6">
        {children}
      </main>
    </div>
  )
}
