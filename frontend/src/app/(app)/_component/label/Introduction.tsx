import React, { FC } from "react"

import { tv } from "tailwind-variants"

import { baseLabel } from "@/app/(app)/_component/label/baseLabel"

type IntroductionProps = {
  label: string
}

const introduction = tv({
  base: "text-sm font-normal",
  extend: baseLabel,
})

/** @package */
export const Introduction: FC<IntroductionProps> = (props) => {
  const { label } = props

  return <p className={introduction()}>{label}</p>
}
