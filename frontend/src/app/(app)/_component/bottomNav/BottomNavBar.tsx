"use client"

import React, { FC, ReactNode } from "react"
import { usePathname } from "next/navigation"

import { tv } from "tailwind-variants"

type BottomNavBarProps = {
  children: ReactNode
}

const bottomNavBar = tv({
  base: `
  w-full grid-cols-3 py-0.5
  sm:w-auto sm:flex-col sm:gap-6 sm:py-0`,
  variants: {
    isShow: {
      false: "hidden sm:flex",
      true: "flex",
    },
  },
})

/** @package */
export const BottomNavBar: FC<BottomNavBarProps> = (props) => {
  const { children } = props

  const pathname = usePathname()

  const isShowBottomNav = pathname === "/search" || pathname === "/favorite" || pathname === "/shopping"

  // TODO: スクロールしている時は非表示にする
  return <div className={bottomNavBar({ isShow: isShowBottomNav })}>{children}</div>
}
