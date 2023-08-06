import React, { FC, ReactNode } from "react"

import { tv } from "tailwind-variants"

type Title =
  | "お気に入り"
  | "買い物リスト"
  | "マイページ"
  | "マイレシピ"
  | "新着レシピ"
  | "新規登録"
  | "設定"
  | "利用規約"
  | "編集"
  | "下書き"

type PageHeaderProps = {
  hasBorder?: boolean
  leftSectionChildren?: ReactNode
  rightSectionChildren?: ReactNode
  title?: Title
  titleAlign?: "center" | "left"
}

const pageHeaderTitle = tv({
  slots: {
    container: "relative flex h-12 items-center justify-between px-4",
    title: "absolute inset-x-0 w-fit font-bold",
  },
  variants: {
    hasBorder: {
      true: {
        container: "border-b border-mauve-6",
      },
    },
    titleAlign: {
      center: {
        title: "mx-auto",
      },
      left: {
        title: "ml-14",
      },
    },
  },
})

/** @package */
export const PageHeader: FC<PageHeaderProps> = (props) => {
  const {
    hasBorder = true,
    leftSectionChildren,
    rightSectionChildren,
    title,
    titleAlign = "center",
  } = props

  const { container, title: titleClass } = pageHeaderTitle({
    hasBorder,
    titleAlign,
  })

  return (
    <div className={container()}>
      {leftSectionChildren ? (
        <div className="flex items-center">{leftSectionChildren}</div>
      ) : null}
      {title ? (
        <div className={titleClass()}>
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
