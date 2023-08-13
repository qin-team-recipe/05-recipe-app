import React, { FC, ReactNode } from "react"

import { DrawerWrapper } from "@/app/(app)/_component/drawer"
import { baseLabel } from "@/app/(app)/_component/label"
import { parseHtml } from "@/app/(app)/_lib"

type AddMyRecipeDrawerProps = {
  children: ReactNode
  instruction: string
  instructionStep: number
}

/** @package */
export const AddMyRecipeDrawer: FC<AddMyRecipeDrawerProps> = (props) => {
  const { children, instruction, instructionStep } = props

  const parsedInstruction = parseHtml(instruction, "visibleImage")

  const drawerContent = () => {
    return (
      <div>
        <div className="sticky top-0 h-fit overflow-hidden bg-[#FAFAFA] pb-[5px]">
          <h4
            className={baseLabel({ size: "xl" })}
          >{`作り方 ${instructionStep}`}</h4>
        </div>
        <div className="overflow-y-auto break-all pt-5">
          {parsedInstruction}
        </div>
      </div>
    )
  }

  return (
    <DrawerWrapper drawerContent={drawerContent()}>{children}</DrawerWrapper>
  )
}
