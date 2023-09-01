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
  isBgGray?: boolean
  isTitleGray?: boolean
  leftSectionChildren?: ReactNode
  rightSectionChildren?: ReactNode
  title?: Title
  titleAlign?: "center" | "left"
}

const pageHeaderTitle = tv({
  slots: {
    container:
      "relative flex h-12 items-center justify-between px-4 background-white",
    title:
      "absolute inset-x-0 w-fit whitespace-nowrap text-xl font-bold font-bold leading-6 text-mauve-12",
  },
  variants: {
    hasBorder: {
      true: {
        container: "border-b border-mauve-6",
      },
    },
    isBgGray: {
      true: {
        container: "bg-mauve-2",
      },
    },
    isTitleGray: {
      true: {
        title: "text-mauve-11",
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
    isBgGray = false,
    isTitleGray = false,
    leftSectionChildren,
    rightSectionChildren,
    title,
    titleAlign = "center",
  } = props

  const { container, title: sTitle } = pageHeaderTitle({
    hasBorder,
    isBgGray,
    isTitleGray,
    titleAlign,
  })

  return (
    <div className={container()}>
      {leftSectionChildren ? (
        <div className="flex items-center">{leftSectionChildren}</div>
      ) : null}
      {title ? <h1 className={sTitle()}>{title}</h1> : null}
      {rightSectionChildren ? (
        <div className="flex w-full justify-end">{rightSectionChildren}</div>
      ) : null}
    </div>
  )
}
