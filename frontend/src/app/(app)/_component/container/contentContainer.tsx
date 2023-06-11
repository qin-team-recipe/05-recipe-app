import React, { FC, ReactNode } from "react"

type ContentContainerProps = {
  children: ReactNode
}

/** @package */
export const ContentContainer: FC<ContentContainerProps> = (props) => {
  const { children } = props

  return <div className="px-4 py-5">{children}</div>
}
