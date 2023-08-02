import React, { ButtonHTMLAttributes, FC, ReactNode } from "react"

import { tv } from "tailwind-variants"

type UpdateButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  isSave?: boolean
}
const updateButton = tv({
  base: "w-full px-3 py-2 border pointer rounded",
  variants: {
    isSave: {
      false:
        "border-tomato-7 text-tomato-11 bg-tomato-1 hover:bg-tomato-2 active:bg-tomato-3",
      true: "bg-tomato-solid border-tomato-10 text-tomato-1 active:bg-tomato-11 dark:border-tomato-9",
    },
  },
})

/** @package */
export const UpdateButton: FC<UpdateButtonProps> = (props) => {
  const { children, isSave = false } = props
  return <button className={updateButton({ isSave })}>{children}</button>
}
