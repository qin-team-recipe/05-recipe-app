import React, { FC } from "react"

import { tv } from "tailwind-variants"

import { ContentContainer } from "@/app/(app)/_component/container"
import { Step } from "@/app/(app)/_component/instruction"
import { baseLabel } from "@/app/(app)/_component/label"
import { parseHtml } from "@/app/(app)/_lib"

type InstructionProps = {
  instruction: string
  isBorderTop?: boolean
  isVisibleAll?: boolean
  step: number
}

const instructionTv = tv({
  slots: {
    container:
      "background-white w-full border-0 border-b border-mauve-7 py-2 pr-6",
  },
  variants: {
    isBorderTop: {
      false: {
        container: "border-t-0",
      },
      true: {
        container: "border-t",
      },
    },
  },
})

/** @package */
export const Instruction: FC<InstructionProps> = (props) => {
  const { instruction, isBorderTop = false, isVisibleAll = true, step } = props

  const { container } = instructionTv({
    isBorderTop,
  })
  const parsedInstruction = parseHtml(
    instruction,
    isVisibleAll ? "visibleImage" : "hiddenImage",
  )

  return (
    <div className={container()}>
      <ContentContainer>
        <div className="flex w-full space-x-2">
          <Step step={step} />

          <div className={`flex flex-col items-start text-left ${baseLabel()}`}>
            {parsedInstruction}
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}
