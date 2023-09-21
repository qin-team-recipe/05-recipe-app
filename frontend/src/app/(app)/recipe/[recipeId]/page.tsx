import React, { FC } from "react"

import { getInstructionList } from "@/mock/api"
import { IconCopy } from "@tabler/icons-react"

import { Instruction } from "@/app/(app)/_component/instruction"
import { Tab } from "@/app/(app)/_component/tab"
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

  const instructionList = getInstructionList()
  const linkList = tabLinkList(params.recipeId)

  return (
    <div className="py-7">
      <Tab linkList={linkList}>
        <div>
          {instructionList.map((instruction, index) => {
            return (
              <Instruction
                key={instruction}
                instruction={instruction}
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
  )
}

export default RecipePage
