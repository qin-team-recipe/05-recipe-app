"use client"

import React, { FC } from "react"

import { IconDotsCircleHorizontal, IconPlus } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { RecipeItemWithChecked } from "@/app/(app)/shopping/_component/RecipeItemWithChecked"
import { ShoppingListDDMenu } from "@/app/(app)/shopping/_component/ShoppingListDDMenu"

type RecipeItemWithChecked = {
  id: number
  isDone: boolean
  note: string
}

type RecipeItemList = RecipeItemWithChecked[]

type ToBuyListBlockProps = {
  recipeItemList: RecipeItemList
  title: string
}

const style = tv({
  slots: {
    header: "flex items-center justify-between gap-2 px-4 py-3",
    menuWrapper: "flex items-center gap-4",
    titleStyle: "text-lg font-bold line-clamp-1",
    wrapper: "py-4",
  },
})

/** @package */
export const ToBuyListBlock: FC<ToBuyListBlockProps> = (props) => {
  const { recipeItemList, title } = props

  const { header, menuWrapper, titleStyle, wrapper } = style()

  return (
    <div className={wrapper()}>
      <div className={header()}>
        <div className={titleStyle()}>{title}</div>
        <div className={menuWrapper()}>
          <button>
            <IconPlus className="h-6 w-6 cursor-pointer text-mauve-12" />
          </button>
          <ShoppingListDDMenu>
            <IconDotsCircleHorizontal className="h-6 w-6 cursor-pointer text-mauve-12" />
          </ShoppingListDDMenu>
        </div>
      </div>
      <div>
        {recipeItemList.map((recipeItem) => {
          return (
            <RecipeItemWithChecked
              isDone={recipeItem.isDone}
              key={recipeItem.id}
              note={recipeItem.note}
            ></RecipeItemWithChecked>
          )
        })}
      </div>
    </div>
  )
}
