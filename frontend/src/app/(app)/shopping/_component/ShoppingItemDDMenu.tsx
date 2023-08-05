"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { baseDDMenu, DDMenuWrapper } from "@/app/_component/"

type ShoppingItemDDMenuProps = {
  children: ReactNode
}

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
