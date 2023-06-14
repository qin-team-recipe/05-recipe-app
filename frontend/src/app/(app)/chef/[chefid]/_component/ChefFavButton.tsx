"use client"

import React, { FC, useCallback, useState } from "react"

import { FavSvg } from "@/app/(app)/_component/icon"

/** @package */
export const ChefFavButton: FC = () => {
  const [bgColor, SetbgColor] = useState<string>("bg-mauve-9")
  const handleClick = useCallback(() => {
    SetbgColor((prevColor) => {
      return prevColor === "bg-mauve-9" ? "bg-tomato-9" : "bg-mauve-9"
    })
  }, [])

  return (
    <button
      onClick={handleClick}
      className={`absolute bottom-[-20px] right-4 z-10 grid aspect-square w-16 place-items-center rounded-full ${bgColor}`}
    >
      <FavSvg color="stroke-mauve-1" width={40} height={40} strokeWidth={1.5} />
    </button>
  )
}
