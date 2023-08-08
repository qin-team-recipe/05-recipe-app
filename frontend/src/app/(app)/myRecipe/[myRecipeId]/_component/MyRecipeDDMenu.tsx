"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconCopy, IconLock, IconPencil, IconTrash } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { baseDDMenu, DDMenuWrapper } from "@/app/_component/"

type MyRecipeDDMenuProps = {
  children: ReactNode
  isPublish: boolean
}

const myRecipeDDMenu = tv({
  extend: baseDDMenu,
})


/** @package */
export const MyRecipeDDMenu: FC<MyRecipeDDMenuProps> = (props) => {
  const { children, isPublish } = props

  const { content, item, mainText, separator, subText } = myRecipeDDMenu()

  const menuContent = () => {
    return isPublish ? (
      <DropdownMenu.Content className={content()}>
        <DropdownMenu.Item className={item()}>
          <IconPencil width={20} height={20} />
          <div>
            <div className={mainText()}>編集する</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={item()}>
          <IconCopy width={20} height={20} />
          <div>
            <div className={mainText()}>URLをコピーする</div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className={item()}>
          <IconLock width={20} height={20} />
          <div>
            <div className={mainText()}>公開を停止する</div>
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
    ) : (
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
