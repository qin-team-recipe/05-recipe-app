"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconCopy, IconLock, IconPencil, IconTrash } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { baseDDMenu, DDMenuWrapper } from "@/app/_component"

type InstructionDDMenuProps = {
  children: ReactNode
}

const instructionDDMenu = tv({
  extend: baseDDMenu,
})

/** @package */
export const InstructionDDMenu: FC<InstructionDDMenuProps> = (props) => {
  const { children } = props

  const { content, item, mainText, separator } = instructionDDMenu()

  const menuContent = () => {
    return (
      <DropdownMenu.Content className={content()}>
        {/* TODO: 「編集する」をクリックで作り方ドロワーを表示させる */}
        <DropdownMenu.Item className={item()}>
          <IconPencil width={20} height={20} />
          <div>
            <div className={mainText()}>編集する</div>
          </div>
        </DropdownMenu.Item>

        <DropdownMenu.Item className={item()}>
          <IconCopy width={20} height={20} />
          <div>
            <div className={mainText()}>上に移動する</div>
          </div>
        </DropdownMenu.Item>

        <DropdownMenu.Item className={item()}>
          <IconLock width={20} height={20} />
          <div>
            <div className={mainText()}>下に移動する</div>
          </div>
        </DropdownMenu.Item>

        <DropdownMenu.Separator className={separator()} />

        <DropdownMenu.Item className={item()}>
          <IconTrash width={20} height={20} />
          <div>
            <div className={mainText()}>リストから削除する</div>
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
