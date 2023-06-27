import React, { FC } from "react"

import { IconShoppingCartPlus } from "@tabler/icons-react"

type RecipeItem = {
  note: string
}

export const RecipeItem: FC<RecipeItem> = (props) => {
  const { note } = props

  return (
    <div className="flex h-12 items-center justify-between">
      <div className="pl-4">{note}</div>
      <IconShoppingCartPlus
        className="pr-4"
        size={40}
        strokeWidth={2}
        color={"black"}
      />
    </div>
  )
}
