import React from "react"

import { getToBuyList } from "@/mock/api"

import {
  RecipeItemWithChecked,
  ShoppingPageHeader,
  ToBuyListBlock,
} from "@/app/(app)/shopping/_component"

export const metadata = {
  title: "買い物リスト",
}

type RecipeItemWithChecked = {
  id: number
  isDone: boolean
  note: string
}

type RecipeItemList = RecipeItemWithChecked[]

type ToBuyListBlock = {
  recipeItemList: RecipeItemList
  title: string
}

type ToBuyListResponse = ToBuyListBlock[]

export default function FavoritePage() {
  const toBuyList: ToBuyListResponse = getToBuyList()

  return (
    <div>
      <ShoppingPageHeader />
      <form action="">
        {toBuyList.map((toBuyListBlock) => {
          return (
            <ToBuyListBlock
              recipeItemList={toBuyListBlock.recipeItemList}
              key={toBuyListBlock.title}
              title={toBuyListBlock.title}
            ></ToBuyListBlock>
          )
        })}
      </form>
    </div>
  )
}
