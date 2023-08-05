"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { DDMenuWrapper } from "@/app/_component/"

type ShoppingItemDDMenuProps = {
  children: ReactNode
}

const baseDDMenu = tv({
  slots: {
    content:
      "absolute right-[-10px] top-0 min-w-[220px] rounded-md bg-mauve-1 p-1 shadow-lg",
    item: "cursor-pointer flex items-start gap-3 select-none rounded px-1 py-[6px] pl-2 text-sm text-mauve-12 outline-none hover:bg-mauve-3 hover:text-mauve-12",
    mainText: "h-5 pb-1 leading-5 whitespace-nowrap",
    separator: "m-1 h-[1px] bg-mauve-5",
    subText: "pb-1 text-xs leading-5 whitespace-nowrap",
  },
})

const shoppingItemDDMenu = tv({
  extend: baseDDMenu,
})

export const ShoppingItemDDMenu: FC<ShoppingItemDDMenuProps> = (props) => {
  const { children } = props

  const { content, item, mainText, separator } = shoppingItemDDMenu()

  const menuContent = () => {
    return (
      <DropdownMenu.Content className={content()}>
        <DropdownMenu.Item className={item()}>
          <IconChevronUp width={20} height={20} />
          <div>
            <div className={mainText()}>上に移動する</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={item()}>
          <IconChevronDown width={20} height={20} />
          <div>
            <div className={mainText()}>下に移動する</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className={separator()} />
        <DropdownMenu.Item className={item()}>
          <IconTrash width={20} height={20} />
          <div>
            <div className={mainText()}>アイテムを削除する</div>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    )
  }

  return (
    <DDMenuWrapper menuContentChildren={menuContent()}>
      {children}
    </DDMenuWrapper>
  )
}
