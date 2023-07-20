"use client"

import React, { FC, ReactNode } from "react"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  IconChefHat,
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconCopy,
  IconLock,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react"
import { tv } from "tailwind-variants"

type Border = "border"

type Item = {
  iconName?:
    | "pencil"
    | "copy"
    | "trash"
    | "lock"
    | "up"
    | "down"
    | "check"
    | "chef"
  mainText: string
  subText?: string
}

type DDmenuWrapperProps = {
  children: ReactNode
  items: (Border | Item)[]
}

const ddMenu = tv({
  slots: {
    contentStyle:
      "absolute right-[-10px] top-0 min-w-[220px] rounded-md bg-mauve-1 p-1 shadow-lg",
    itemStyle:
      "cursor-pointer select-none rounded px-1 pb-1 pl-3 text-sm leading-none text-mauve-11 outline-none hover:bg-mauve-3 hover:text-mauve-12",
    separatorStyle: "m-1 h-[1px] bg-mauve-5",
  },
})

/** @package */
export const DDMenuWrapper: FC<DDmenuWrapperProps> = (props) => {
  const { children, items } = props
  const { contentStyle, itemStyle, separatorStyle } = ddMenu()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={contentStyle()}>
          {items.map((item, index) => {
            return item === "border" ? (
              <DropdownMenu.Separator
                key={index}
                className={separatorStyle()}
              />
            ) : (
              <DropdownMenu.Item key={index} className={itemStyle()}>
                <div className="flex items-start gap-1">
                  {item.iconName === "pencil" && (
                    <IconPencil width={20} height={20} />
                  )}
                  {item.iconName === "copy" && (
                    <IconCopy width={20} height={20} />
                  )}
                  {item.iconName === "trash" && (
                    <IconTrash width={20} height={20} />
                  )}
                  {item.iconName === "lock" && (
                    <IconLock width={20} height={20} />
                  )}
                  {item.iconName === "up" && (
                    <IconChevronUp width={20} height={20} />
                  )}
                  {item.iconName === "down" && (
                    <IconChevronDown width={20} height={20} />
                  )}
                  {item.iconName === "check" && (
                    <IconCircleCheck width={20} height={20} />
                  )}
                  {item.iconName === "chef" && (
                    <IconChefHat width={20} height={20} />
                  )}
                  <div>
                    <div className="h-5 pb-1 leading-5">{item.mainText}</div>
                    {item.subText && (
                      <div className="h-5 pb-1 text-xs leading-5">
                        {item.subText}
                      </div>
                    )}
                  </div>
                </div>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
