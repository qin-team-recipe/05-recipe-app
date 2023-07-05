import React, { FC, ReactNode } from "react"

import { tv } from "tailwind-variants"

type PageHeaderProps = {
  leftSectionChildren?: ReactNode
  rightSectionChildren?: ReactNode
  title?: "お気に入り" | "買い物リスト" | "マイページ"
  titleAlign?: "center" | "left"
}

const pageHeaderTitle = tv({
  base: "absolute inset-x-0 w-fit font-bold",
  variants: {
    align: {
      center: "mx-auto",
      left: "ml-14",
    },
  },
})

/** @package */
export const PageHeader: FC<PageHeaderProps> = (props) => {
  const {
    leftSectionChildren,
    rightSectionChildren,
    title,
    titleAlign = "center",
  } = props

  return (
    <div className="relative flex h-12 items-center justify-between border-b border-mauve-6 px-4">
      {leftSectionChildren ? (
        <div className="flex items-center">{leftSectionChildren}</div>
      ) : null}
      {title ? (
        <div className={pageHeaderTitle({ align: titleAlign })}>
          <h1 className="whitespace-nowrap text-xl font-bold leading-6 text-mauve-12">
            {title}
          </h1>
        </div>
      ) : null}
      {rightSectionChildren ? (
        <div className="flex w-full justify-end">{rightSectionChildren}</div>
      ) : null}
    </div>
  )
}
