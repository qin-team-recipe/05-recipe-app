"use client"

import React, { FC, useCallback, useReducer } from "react"

import { FavSvg } from "@/app/(app)/_component/icon"

type State = {
  bgColor: string
  strokeColor: string
  textColor: string
}

type Action = {
  type: "TOGGLE_COLOR"
}

const initialState: State = {
  bgColor: "bg-mauve-12",
  strokeColor: "stroke-mauve-7",
  textColor: "text-mauve-7",
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_COLOR":
      return {
        ...state,
        bgColor: state.bgColor === "bg-mauve-12" ? "bg-tomato-2" : "bg-mauve-12",
        strokeColor: state.strokeColor === "stroke-mauve-7" ? "stroke-tomato-10" : "stroke-mauve-7",
        textColor: state.textColor === "text-mauve-7" ? "text-tomato-10" : "text-mauve-7",
      }
    default:
      return state
  }
}

export const RecipeFavButton: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleClick = useCallback(() => {
    dispatch({ type: "TOGGLE_COLOR" })
  }, [])

  return (
    <button
      onClick={handleClick}
      className={`absolute right-1 top-1 flex w-fit items-center gap-1 rounded-full ${state.bgColor} bg-opacity-60 p-2 text-xs`}
    >
      <FavSvg color={`${state.strokeColor}`} width={16} height={16} strokeWidth={3} />
      <div className={`${state.textColor}`}>1,234</div>
    </button>
  )
}
