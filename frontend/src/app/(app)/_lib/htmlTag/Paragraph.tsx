import React, { FC, ReactNode } from "react"

type ParagraphProps = {
  children?: ReactNode
}

/** @package */
export const Paragraph: FC<ParagraphProps> = (props) => {
  const { children } = props

  return <p className="text-tomato-8">{children}</p>
}
