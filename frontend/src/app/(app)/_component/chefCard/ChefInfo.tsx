import React, { FC } from "react"

import { IconToolsKitchen2 } from "@tabler/icons-react"

type ChefInfoProps = {
  count: number
  introduction?: string
  name: string
}

/** @package */
export const ChefInfo: FC<ChefInfoProps> = (props) => {
  const { count, introduction, name } = props

  return (
    <div className="h-full w-full">
      <p className="text-lg font-bold">{name}</p>
      <div className="h-1/2">
        <p className="h-full overflow-hidden text-ellipsis text-sm text-mauve-10 line-clamp-3">
          {introduction}
        </p>
      </div>
      <div className="flex items-center pt-1">
        <IconToolsKitchen2 size={14} />

        <p className="text-sm">{count}レシピ</p>
      </div>
    </div>
  )
}
