import React, { FC, ReactNode } from "react"

import { tv } from "tailwind-variants"

import { baseLabel } from "@/app/(app)/_component/label"

type ParagraphProps = {
  children?: ReactNode
}

const paragraph = tv({
  extend: baseLabel(),
})

/** @package */
export const Paragraph: FC<ParagraphProps> = (props) => {
  const { children } = props

  return <p className={paragraph()}>{children}</p>
  // return <p>{children}</p>
}
