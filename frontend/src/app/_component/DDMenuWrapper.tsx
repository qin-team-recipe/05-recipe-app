"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

type DDmenuWrapperProps = {
  children: ReactNode
  menuContentChildren: ReactNode
}

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
