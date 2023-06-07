"use client"

import React, { FC, ReactNode } from "react"

type BottomNavBarProps = {
  children: ReactNode
}

/** @package */
export const BottomNavBar: FC<BottomNavBarProps> = (props) => {
  const { children } = props

  // TODO: スクロールしている時は非表示にする
  return <nav className="grid w-full grid-cols-3 py-2">{children}</nav>
}
