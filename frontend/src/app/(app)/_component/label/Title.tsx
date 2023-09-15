import React, { FC } from "react"

import { tv } from "tailwind-variants"

import { baseLabel } from "@/app/(app)/_component/label/baseLabel"

type TitleProps = {
  label: string
  size?: "xl" | "2xl" | "3xl"
}

/** @package */
export const STitle = tv({
  base: "font-bold",
  extend: baseLabel,
  variants: {
    size: {
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      xl: "text-xl",
    },
  },
})

export const Title: FC<TitleProps> = (props) => {
  const { label, size = "2xl" } = props

  return <h2 className={STitle({ size })}>{label}</h2>
}
