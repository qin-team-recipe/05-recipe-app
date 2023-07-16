import React, { FC } from "react"

import { tv } from "tailwind-variants"

import { baseLabel } from "@/app/(app)/_component/label/baseLabel"

type CountWithLabelProps = {
  count: number
  label: "レシピ" | "フォロワー" | "お気に入り"
}

const countWithLabel = tv({
  base: "flex gap-1 text-mauve-dim text-sm",
  extend: baseLabel,
})

/** @package */
export const CountWithLabel: FC<CountWithLabelProps> = (props) => {
  const { count, label } = props

  return (
    <div className={countWithLabel()}>
      <span className="font-bold">{count}</span>
      <span className="font-normal">{label}</span>
    </div>
  )
}
