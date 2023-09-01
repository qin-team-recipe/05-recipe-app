"use client"

import React, { FC, useState } from "react"

import { TRecipeItem } from "@/type"
import { IconShoppingCartPlus } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

const color = tv({
  base: "w-16 px-2",
  variants: {
    isFollow: {
      false: "text-gray-11",
      true: "text-tomato-11",
    },
  },
})

export const RecipeItem: FC<TRecipeItem> = (props) => {
  const { note } = props
  const [isFollow, setIsFollow] = useState<boolean>(false)

  const handleClick = () => {
    setIsFollow((isFollow) => {
      return !isFollow
    })
  }

  return (
    <div className="flex h-12 items-center justify-between">
      <div className="pl-4">{note}</div>
      <button onClick={handleClick} className={color({ isFollow })}>
        <IconShoppingCartPlus className="w-full" strokeWidth={2} />
      </button>
    </div>
  )
}
