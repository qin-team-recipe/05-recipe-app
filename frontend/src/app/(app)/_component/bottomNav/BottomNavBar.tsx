import React, { FC, ReactNode } from "react"

type BottomNavBarProps = {
  children: ReactNode
}

/** @package */
export const BottomNavBar: FC<BottomNavBarProps> = (props) => {
  const { children } = props

  // TODO: スクロールしている時は非表示にする
  return <div className="grid w-full grid-cols-3 py-0.5 sm:flex sm:w-auto sm:flex-col sm:gap-6 sm:py-0">{children}</div>
}
