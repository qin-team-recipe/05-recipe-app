"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconCopy, IconPencil } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { DDMenuWrapper } from "@/app/_component/"

type MyPageDDMenuProps = {
  children: ReactNode
}

const baseDDMenu = tv({
  slots: {
    content:
      "absolute right-[-10px] top-0 min-w-[220px] rounded-md bg-mauve-1 p-1 shadow-lg flex flex-col gap-1",
    item: "cursor-pointer flex items-start gap-3 select-none rounded px-1 pb-1 pl-2 text-sm  text-mauve-11 outline-none hover:bg-mauve-3 hover:text-mauve-12",
    mainText: "h-5 pb-1 leading-5",
    separator: "m-1 h-[1px] bg-mauve-5",
    subText: "h-5 pb-1 text-xs leading-5",
  },
})

const myPageDDMenu = tv({
  extend: baseDDMenu,
})

export const MyPageDDMenu: FC<MyPageDDMenuProps> = (props) => {
  const { children } = props

  const { content, item, mainText } = myPageDDMenu()

  const menuContent = () => {
    return (
      <DropdownMenu.Content className={content()}>
        <DropdownMenu.Item className={item()}>
          <IconPencil width={20} height={20} />
          <div>
            <div className={mainText()}>プロフィールを編集する</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={item()}>
          <IconCopy width={20} height={20} />
          <div>
            <div className={mainText()}>URLをコピーする</div>
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
