import React, { FC } from "react"
import { Route } from "next"
import Link from "next/link"

type BottomNavItemProps<T extends string> = {
  href: Route<T> | URL
  navLabel: "検索" | "お気に入り" | "お買い物"
}

/** @package */
export const BottomNavItem: FC<BottomNavItemProps<string>> = (props) => {
  const { href, navLabel } = props

  return (
    <Link href={href} className="flex flex-col items-center justify-center">
      <p>🚀</p>
      {navLabel}
    </Link>
  )
}
