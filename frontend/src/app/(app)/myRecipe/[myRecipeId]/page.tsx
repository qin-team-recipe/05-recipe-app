import React, { FC } from "react"

import { getInstructionList, getRecipe } from "@/mock/api"
import { IconCopy } from "@tabler/icons-react"

import { MyRecipe } from "@/app/(app)/_component/header"
import { Instruction } from "@/app/(app)/_component/instruction"
import { Tab } from "@/app/(app)/_component/tab"
import { MyRecipePageDetail } from "@/app/(app)/myRecipe/[myRecipeId]/_component"
import { tabLinkList } from "@/app/(app)/myRecipe/[myRecipeId]/_lib"

export const metadata = {
  title: "マイレシピ詳細 | 作り方",
}

type MyRecipePageProps = {
  params: {
    myRecipeId: string
  }
}

const MyRecipePage: FC<MyRecipePageProps> = (props) => {
  const { params } = props

  const linkList = tabLinkList(params.myRecipeId)
  const recipeData: MyRecipe = { ...getRecipe(), isPublish: true }
  const instructionList = getInstructionList()

  return (
    <div>
      <MyRecipePageDetail data={recipeData} />

      <div className="py-7">
        <Tab linkList={linkList}>
          <div>
            {instructionList.map((instruction, index) => {
              return (
                <Instruction
                  key={index + 1}
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
    </div>
  )
}

export default MyRecipePage
