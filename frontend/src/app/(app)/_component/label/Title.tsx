import React, { FC } from "react"

import { tv } from "tailwind-variants"

import { baseLabel } from "@/app/(app)/_component/label/baseLabel"

type TitleProps = {
  label: string
  size?: "2xl" | "3xl"
}

const title = tv({
  base: "font-bold",
  extend: baseLabel,
  variants: {
    size: {
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
  },
})

export const Title: FC<TitleProps> = (props) => {
  const { label, size = "2xl" } = props

  return <h2 className={title({ size })}>{label}</h2>
}
