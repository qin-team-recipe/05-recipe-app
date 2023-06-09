"use client"

import React, { FC } from "react"
import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { CartSvg, FavSvg, SearchSvg } from "@/app/(app)/_component/icon"

/** @package */
export type NavLabel = "検索" | "お気に入り" | "お買い物"
type BottomNavItemProps<T extends string> = {
  href: Route<T> | URL
  navLabel: "検索" | "お気に入り" | "お買い物"
}

/** @package */
export const BottomNavItem: FC<BottomNavItemProps<string>> = (props) => {
  const { href, navLabel } = props
  const pathname = usePathname()
  const textColor =
    pathname === href
      ? "text-tomato-11 dark:text-tomatodark-11"
      : "text-gray-11 hover:text-tomato-11 stroke-gray-11 hover:stroke-tomato-11 dark:text-graydark-11 dark:hover:text-tomatodark-11 dark:stroke-graydark-11 dark:hover:stroke-tomatodark-11"
  const imgColor =
    pathname === href
      ? "stroke-tomato-11 dark:stroke-tomatodark-11"
      : "stroke-gray-11 group-hover:stroke-tomato-11 dark:stroke-graydark-11 darkroup-hover:stroke-tomatodark-11"

  return (
    <Link href={href} className={`group flex flex-col items-center justify-center gap-1 ${textColor}`}>
      {navLabel === "検索" ? (
        <SearchSvg color={imgColor} />
      ) : navLabel === "お気に入り" ? (
        <FavSvg color={imgColor} />
      ) : (
        <CartSvg color={imgColor} />
      )}
      <div className="text-xs">{navLabel}</div>
    </Link>
  )
}
