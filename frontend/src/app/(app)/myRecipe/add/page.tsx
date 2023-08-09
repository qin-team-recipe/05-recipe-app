import React, { FC } from "react"

import { getInstructionList } from "@/mock/api"
import { IconDotsVertical } from "@tabler/icons-react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { Instruction } from "@/app/(app)/_component/instruction"
import { baseLabel } from "@/app/(app)/_component/label"
import {
  AddMyRecipeDrawer,
  AddMyRecipePageHeader,
} from "@/app/(app)/myRecipe/add/_component"

const AddMyRecipePage: FC = async () => {
  const instructionList = getInstructionList()

  return (
    <div>
      <AddMyRecipePageHeader />

      {/*<form className="bg-mauve-2 pb-20">*/}
      <form className="pb-20">
        <div className="bg-transparent pt-8">
          <ContentContainer>
            <h3 className={baseLabel({ fontWeight: "bold", size: "xl" })}>
              作り方
            </h3>
          </ContentContainer>
          <div>
            {instructionList.map((instruction, index) => {
              return (
                <div key={index + 1} className="relative flex">
                  <AddMyRecipeDrawer
                    instruction={instruction}
                    instructionStep={index + 1}
                  >
                    <div className="w-full items-start break-all">
                      <Instruction
                        instruction={instruction}
                        isBorderTop={index + 1 === 1}
                        isVisibleAll={false}
                        step={index + 1}
                      />
                    </div>
                  </AddMyRecipeDrawer>

                  {/* divではなくDDMenuを設置する */}
                  <div>
                    <IconDotsVertical className="absolute right-5 top-[10px] h-4 w-4 text-mauve-11" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddMyRecipePage
