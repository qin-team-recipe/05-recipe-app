import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { Step } from "@/app/(app)/_component/instruction"
import { parseHtml } from "@/app/(app)/_lib"

type InstructionProps = {
  instruction: string
  step: number
}

/** @package */
export const Instruction: FC<InstructionProps> = (props) => {
  const { instruction, step } = props

  const parsedInstruction = parseHtml(instruction)

  return (
    <div className="w-full border border-0 border-b-[1px] border-mauve-7 py-2">
      <ContentContainer>
        <div className="flex w-full space-x-2">
          <Step step={step} />
          <div>{parsedInstruction}</div>
        </div>
      </ContentContainer>
    </div>
  )
}
