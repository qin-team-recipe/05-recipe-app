"use client"

import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

type MyRecipeAddProviderProps = {
  children: ReactNode
}

/** @package */
export type MyRecipeAddDrawer = {
  instruction: string
  instructionStep: number
  isOpen: boolean
}

type Context = {
  myRecipeAddDrawer: MyRecipeAddDrawer
  setMyRecipeAddDrawer: Dispatch<SetStateAction<MyRecipeAddDrawer>>
}

/** @package */
export const MyRecipeAddContext = createContext<Context>({
  myRecipeAddDrawer: {
    instruction: "",
    instructionStep: 0,
    isOpen: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMyRecipeAddDrawer: () => {},
})

/** @package */
export const MyRecipeAddProvider: FC<MyRecipeAddProviderProps> = (props) => {
  const { children } = props

  const [myRecipeAddDrawer, setMyRecipeAddDrawer] = useState({
    instruction: "",
    instructionStep: 0,
    isOpen: false,
  })

  return (
    <MyRecipeAddContext.Provider
      value={{
        myRecipeAddDrawer: myRecipeAddDrawer,
        setMyRecipeAddDrawer: setMyRecipeAddDrawer,
      }}
    >
      {children}
    </MyRecipeAddContext.Provider>
  )
}
