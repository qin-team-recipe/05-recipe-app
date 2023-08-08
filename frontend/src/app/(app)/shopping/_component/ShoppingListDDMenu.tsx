"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  IconChefHat,
  IconChevronDown,
  IconCircleCheck,
  IconTrash,
} from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { baseDDMenu, DDMenuWrapper } from "@/app/_component/"

type ShoppingListDDMenuProps = {
  children: ReactNode
}

const shoppingListDDMenu = tv({
  extend: baseDDMenu,
})

/** @package */
export const ShoppingListDDMenu: FC<ShoppingListDDMenuProps> = (props) => {
  const { children } = props

  const { content, item, mainText, separator } = shoppingListDDMenu()

  const menuContent = () => {
    return (
      <DropdownMenu.Content className={content()}>
        <DropdownMenu.Item className={item()}>
          <IconChefHat width={20} height={20} />
          <div>
            <div className={mainText()}>レシピ詳細を見る</div>
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
          <IconCircleCheck width={20} height={20} />
          <div>
            <div className={mainText()}>完了したアイテムだけ削除する</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={item()}>
          <IconTrash width={20} height={20} />
          <div>
            <div className={mainText()}>レシピを買い物リストから削除する</div>
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
