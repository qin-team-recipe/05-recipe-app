"use client"

import React, { FC, ReactNode, useState } from "react"

import * as Checkbox from "@radix-ui/react-checkbox"
import { IconCheck, IconDotsVertical } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { ShoppingItemDDMenu } from "@/app/(app)/shopping/_component/ShoppingItemDDMenu"

type ShoppingItemProps = {
  children: ReactNode
  isCheckedInitial: boolean
  key: string
}

const item = tv({
  slots: {
    checkboxIndicator: "",
    checkboxRoot:
      "flex items-center justify-center rounded-full border-2 w-6 h-6 shrink-0",
    wrapper: "flex items-center justify-between px-4 py-2 gap-1",
  },
  variants: {
    isChecked: {
      false: {
        checkboxIndicator: "text-mauve-12",
        checkboxRoot: "border-tomato-11 bg-mauve-1",
      },
      true: {
        checkboxIndicator: "text-mauve-1",
        checkboxRoot: "border-mauve-8 bg-mauve-8",
      },
    },
  },
})

/** @package */
export const ShoppingItem: FC<ShoppingItemProps> = (props) => {
  const { children, isCheckedInitial, key } = props
  const [isChecked, setIsChecked] = useState<boolean>(isCheckedInitial)

  const handleClick = () => {
    setIsChecked((isChecked) => {
      return !isChecked
    })
  }

  const { checkboxIndicator, checkboxRoot, wrapper } = item({
    isChecked,
  })
  return (
    <div className={wrapper()}>
      <div className="flex items-center gap-3">
        <Checkbox.Root
          className={checkboxRoot()}
          defaultChecked={isCheckedInitial}
          checked={isChecked}
          onCheckedChange={handleClick}
          id={key}
        >
          <Checkbox.Indicator className={checkboxIndicator()}>
            <IconCheck className="p-1" strokeWidth={3} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor={key}>{children}</label>
      </div>
      <div className="shrink-0">
        <ShoppingItemDDMenu>
          <IconDotsVertical className="h-6 w-6 cursor-pointer text-mauve-12" />
        </ShoppingItemDDMenu>
      </div>
    </div>
  )
}
