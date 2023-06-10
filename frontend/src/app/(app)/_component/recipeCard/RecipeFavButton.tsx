"use client"

import React, { FC, useCallback, useState } from "react"

import { FavSvg } from "@/app/(app)/_component/icon"

type State = {
  strokeColor: string
  textColor: string
}

export const RecipeFavButton: FC = () => {
  const [state, setState] = useState<State>({
    strokeColor: "stroke-mauve-7",
    textColor: "text-mauve-7",
  })

  const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = useCallback(() => {
    setState((prevState) => {
      return {
        strokeColor: prevState.strokeColor === "stroke-mauve-7" ? "stroke-tomato-10" : "stroke-mauve-7",
        textColor: prevState.textColor === "text-mauve-7" ? "text-tomato-10" : "text-mauve-7",
      }
    })
  }, [])

  return (
    <button
      onClick={handleClick}
      className={`absolute right-1 top-1 flex w-fit items-center gap-1 rounded-full bg-mauve-12 bg-opacity-60 p-2 text-xs`}
    >
      <FavSvg color={`${state.strokeColor}`} width={16} height={16} strokeWidth={3} />
      <div className={`${state.textColor}`}>1,234</div>
    </button>
  )
}
