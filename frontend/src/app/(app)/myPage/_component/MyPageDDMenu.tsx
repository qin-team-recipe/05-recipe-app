"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconCopy, IconPencil } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { baseDDMenu, DDMenuWrapper } from "@/app/_component/"

type MyPageDDMenuProps = {
  children: ReactNode
}

const myPageDDMenu = tv({
  extend: baseDDMenu,
})

/** @package */
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
