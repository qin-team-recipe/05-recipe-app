"use client"

import React, { FC, useState } from "react"

import { tv } from "tailwind-variants"

import { baseRecipeItem } from "@/app/(app)/_component/recipeItem/baseRecipeItem"

type LinkListProps = {
  preUrl?: string
}
const linkListItem = tv({
  extend: baseRecipeItem,
})

export const LinkListItem: FC<LinkListProps> = (props) => {
  const { preUrl } = props
  const [url, setUrl] = useState(preUrl ?? "")

  return (
    <input
      className={linkListItem()}
      value={url}
      type="text"
      onChange={(e) => {
        return setUrl(e.target.value)
      }}
    />
  )
}
