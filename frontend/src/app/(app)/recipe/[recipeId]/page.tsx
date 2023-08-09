import React, { FC } from "react"

import { getRecipe, getRecipeItemList } from "@/mock/api"
import { IconCopy } from "@tabler/icons-react"

import { Instruction } from "@/app/(app)/_component/instruction"
import { Tab } from "@/app/(app)/_component/tab"
import { RecipePageDetail } from "@/app/(app)/recipe/[recipeId]/_component"
import { tabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

export const metadata = {
  title: "レシピ詳細",
}

type RecipePageProps = {
  params: {
    recipeId: string
  }
}

const RecipePage: FC<RecipePageProps> = async (props) => {
  const { params } = props

  const recipeItemList = getRecipeItemList()
  const linkList = tabLinkList(params.recipeId)
  const recipeData = getRecipe()

  return (
    <div>
      <RecipePageDetail data={recipeData} />

      <div className="py-7">
        <Tab linkList={linkList}>
          <div>
            {recipeItemList.map((recipeItem, index) => {
              return (
                <Instruction
                  key={recipeItem}
                  instruction={recipeItem}
                  step={index + 1}
                />
              )
            })}
          </div>
        </Tab>
        <div className="flex justify-end px-4">
          <button className="flex text-blue-11 active:opacity-95">
            <IconCopy />
            コピーする
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipePage
