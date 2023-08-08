"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { tv } from "tailwind-variants"

type DDmenuWrapperProps = {
  children: ReactNode
  menuContentChildren: ReactNode
}

/** @package */
export const baseDDMenu = tv({
  slots: {
    content:
      "absolute right-[-10px] top-0 min-w-[220px] rounded-md bg-mauve-1 p-1 shadow-lg",
    item: "cursor-pointer flex items-start gap-3 select-none rounded px-1 py-[6px] pl-2 text-sm text-mauve-12 outline-none hover:bg-mauve-3 hover:text-mauve-12",
    mainText: "h-5 pb-1 leading-5 whitespace-nowrap",
    separator: "m-1 h-[1px] bg-mauve-5",
    subText: "pb-1 text-xs leading-5 whitespace-nowrap",
  },
})

/** @package */
export const DDMenuWrapper: FC<DDmenuWrapperProps> = (props) => {
  const { children, menuContentChildren } = props

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>{menuContentChildren}</DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
