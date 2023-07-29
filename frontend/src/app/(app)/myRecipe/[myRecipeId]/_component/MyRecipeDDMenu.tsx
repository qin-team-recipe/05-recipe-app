"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconLock, IconPencil, IconTrash } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { DDMenuWrapper } from "@/app/_component/"

type MyRecipeDDMenuProps = {
  children: ReactNode
}

const baseDDMenu = tv({
  slots: {
    content:
      "absolute right-[-10px] top-0 min-w-[220px] rounded-md bg-mauve-1 p-1 shadow-lg",
    item: "cursor-pointer flex items-start gap-3 select-none rounded px-1 pb-1 pl-2 text-sm text-mauve-11 outline-none hover:bg-mauve-3 hover:text-mauve-12",
    mainText: "h-5 pb-1 leading-5 whitespace-nowrap",
    separator: "m-1 h-[1px] bg-mauve-5",
    subText: "pb-1 text-xs leading-5 whitespace-nowrap",
  },
})

const myRecipeDDMenu = tv({
  extend: baseDDMenu,
})

export const MyRecipeDDMenu: FC<MyRecipeDDMenuProps> = (props) => {
  const { children } = props

  const { content, item, mainText, separator, subText } = myRecipeDDMenu()

  const menuContent = () => {
    return (
      <DropdownMenu.Content className={content()}>
        <DropdownMenu.Item className={item()}>
          <IconPencil width={20} height={20} />
          <div>
            <div className={mainText()}>編集する</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={item()}>
          <IconLock width={20} height={20} />
          <div>
            <div className={mainText()}>レシピを限定公開する</div>
            <div className={subText()}>URLを知っている方のみ閲覧可能</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className={separator()} />
        <DropdownMenu.Item className={item()}>
          <IconTrash width={20} height={20} />
          <div>
            <div className={mainText()}>削除する</div>
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
