import React, { FC, ReactNode } from "react"

import { tv } from "tailwind-variants"

type ContentContainerProps = {
  children: ReactNode
  isPaddingLeft?: boolean
  isPaddingRight?: boolean
}

const container = tv({
  variants: {
    isPaddingLeft: {
      true: "pl-4",
    },
    isPaddingRight: {
      true: "pr-4",
    },
  },
})

/** @package */
export const ContentContainer: FC<ContentContainerProps> = (
  props,
) => {
  const {
    children,
    isPaddingLeft = true,
    isPaddingRight = true,
  } = props

  return (
    <div className={container({ isPaddingLeft, isPaddingRight })}>
      {children}
    </div>
  )
}
