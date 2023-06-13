"use client"

import React, { FC } from "react"
import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { tv } from "tailwind-variants"

import { CartSvg, FavSvg, SearchSvg } from "@/app/(app)/_component/icon"

/** @package */
export type NavLabel = "さがす" | "お気に入り" | "お買い物リスト"
type BottomNavItemProps<T extends string> = {
  href: Route<T> | URL
  navLabel: NavLabel
}

const textColor = tv({
  base: `
  group flex flex-1 flex-col items-center justify-center gap-1 pl-3 py-2 rounded-lg
  sm:hover:bg-tomato-4
  sm:flex-row sm:justify-start sm:gap-2 sm:pr-5 sm:rounded-full `,
  variants: {
    isActive: {
      false: `
      text-gray-11 stroke-gray-11
      hover:text-tomato-11 hover:stroke-tomato-11
      dark:text-graydark-11 dark:hover:text-tomatodark-11
      dark:stroke-graydark-11 dark:hover:stroke-tomatodark-11`,
      true: "text-tomato-11 dark:text-tomatodark-11",
    },
  },
})

const imgColor = tv({
  variants: {
    isActive: {
      false: `
      stroke-gray-11 group-hover:stroke-tomato-11
      dark:stroke-graydark-11 darkroup-hover:stroke-tomatodark-11`,
      true: "stroke-tomato-11 dark:stroke-tomatodark-11",
    },
  },
})

/** @package */
export const BottomNavItem: FC<BottomNavItemProps<string>> = (props) => {
  const { href, navLabel } = props

  const pathname = usePathname()

  const isActive = pathname === href
  const currentIcon = () => {
    switch (navLabel) {
      case "さがす":
        return <SearchSvg color={imgColor({ isActive })} width={24} height={24} />
        break
      case "お気に入り":
        return <FavSvg color={imgColor({ isActive })} width={24} height={24} strokeWidth={1.5} />
        break
      case "お買い物リスト":
        return <CartSvg color={imgColor({ isActive })} width={24} height={24} />
        break
      default:
        return null
    }
  }

  return (
    <Link href={href} className={textColor({ isActive })}>
      {currentIcon()}
      <div className="text-xs sm:text-base">{navLabel}</div>
    </Link>
  )
}
