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
  let textColor = ""
  let imgColor = ""
  if (pathname === href) {
    textColor = "text-tomato-11"
    imgColor = "stroke-tomato-11"
  } else {
    textColor = "text-gray-11 hover:text-tomato-11 stroke-gray-11 hover:stroke-tomato-11"
    imgColor = "stroke-gray-11 group-hover:stroke-tomato-11"
  }

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
