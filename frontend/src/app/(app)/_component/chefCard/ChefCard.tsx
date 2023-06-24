"use client"

import React, { FC } from "react"

import { ChefImg } from "./ChefImg"
import { ChefInfo } from "./ChefInfo"

type ChefCardProps = {
  cardType?: "withDescription" | "withoutDescription" | "round"
  img?: string
  introduction?: string
  name: string
  recipeCount?: number
}

/** @package */
export const ChefCard: FC<ChefCardProps> = (props) => {
  const {
    cardType = "withoutDescription",
    img,
    introduction,
    name,
    recipeCount,
  } = props

  if (cardType === "withDescription") {
    return (
      <div className="flex h-28 w-full items-start gap-4 overflow-hidden">
        <div className="h-full w-28">
          <ChefImg img={img} />
        </div>
        <ChefInfo
          introduction={introduction}
          name={name}
          count={recipeCount ?? 0}
        />
      </div>
    )
  }

  if (cardType === "round") {
    return (
      <div className="flex flex-col items-center gap-2 overflow-hidden">
        <div className="h-20 w-20">
          <ChefImg img={img} rounded="full" />
        </div>
        <p className="text-mauve-normal text-xs font-semibold">{name}</p>
      </div>
    )
  }

  return (
    <div className="min-w-32 relative flex h-56 w-32 overflow-hidden">
      <ChefImg img={img} />
      <p className="absolute bottom-3 left-2 text-xl font-semibold text-mauve-1">
        {name}
      </p>
    </div>
  )
}
