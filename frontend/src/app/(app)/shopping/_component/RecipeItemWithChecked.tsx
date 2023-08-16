"use client"

import React, { FC, useState } from "react"

import * as Checkbox from "@radix-ui/react-checkbox"
import { IconCheck, IconDotsVertical } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { ShoppingItemDDMenu } from "@/app/(app)/shopping/_component/ShoppingItemDDMenu"

type RecipeItemWithCheckedProps = {
  isDone: boolean
  note: string
}

const style = tv({
  slots: {
    checkboxIndicator: "",
    checkboxRoot:
      "flex items-center justify-center rounded-full border-2 w-6 h-6 shrink-0",
    item: "flex items-center gap-3",
    menu: "shrink-0",
    wrapper: "flex items-center justify-between px-4 py-2 gap-1 bg-mauve-1",
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
export const RecipeItemWithChecked: FC<RecipeItemWithCheckedProps> = (
  props,
) => {
  const { isDone, note } = props
  const [isChecked, setIsChecked] = useState<boolean>(isDone)

  const handleClick = () => {
    setIsChecked((isChecked) => {
      return !isChecked
    })
  }

  const { checkboxIndicator, checkboxRoot, item, menu, wrapper } = style({
    isChecked,
  })

  return (
    <div className={wrapper()}>
      <div className={item()}>
        <Checkbox.Root
          className={checkboxRoot()}
          defaultChecked={isDone}
          checked={isChecked}
          onCheckedChange={handleClick}
        >
          <Checkbox.Indicator className={checkboxIndicator()}>
            <IconCheck className="p-1" strokeWidth={3} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label>{note}</label>
      </div>
      <div className={menu()}>
        <ShoppingItemDDMenu>
          <IconDotsVertical className="h-6 w-6 cursor-pointer text-mauve-12" />
        </ShoppingItemDDMenu>
      </div>
    </div>
  )
}
