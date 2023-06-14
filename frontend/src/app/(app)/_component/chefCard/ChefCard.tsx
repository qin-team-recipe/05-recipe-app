"use client"

import React, { FC } from "react"

import { ChefImg } from "./ChefImg"
import { ChefInfo } from "./ChefInfo"

type ChefCardProps = {
  hasDescription: boolean
  img?: string
  introduction?: string
  name: string
  recipeCount?: number
}

/** @package */
export const ChefCard: FC<ChefCardProps> = (props) => {
  const { hasDescription, img, introduction, name, recipeCount } = props

  return hasDescription ? (
    <div className="flex h-28 w-full items-start gap-4 overflow-hidden">
      <div className="h-full w-28">
        <ChefImg img={img} />
      </div>
      <ChefInfo introduction={introduction} name={name} count={recipeCount || 0} />
    </div>
  ) : (
    <div className="min-w-32 relative flex h-56 w-32 overflow-hidden">
      <ChefImg img={img} />
      <p className="absolute bottom-3 left-2 text-xl font-semibold text-gray-1 ">{name}</p>
    </div>
  )
}
