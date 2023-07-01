import React, { FC } from "react"

type InstructionStepProps = {
  step: number
}

/** @package */
export const Step: FC<InstructionStepProps> = (props) => {
  const { step } = props

  return (
    <span
      className={`
      flex h-5 w-5 items-center justify-center
      rounded-full bg-tomato-9 p-2
      text-2xs text-mauve-1`}
    >
      {step}
    </span>
  )
}
