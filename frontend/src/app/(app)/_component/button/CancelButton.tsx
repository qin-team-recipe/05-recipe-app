import React, { ButtonHTMLAttributes, FC } from "react"

import { tv } from "tailwind-variants"

import { formActionButton } from "@/app/(app)/_component/button/baseButton"

type CancelButtonProps = {
  label: "キャンセル"
} & ButtonHTMLAttributes<HTMLButtonElement>

const sCancelButton = tv({
  base: "text-tomato-dim bg-tomato-1 border-tomato-7 hover:bg-tomato-2 active:bg-tomato-3",
  extend: formActionButton,
})

/** @package */
export const CancelButton: FC<CancelButtonProps> = (props) => {
  const { label, ...buttonProps } = props

  return (
    <button type="button" className={sCancelButton()} {...buttonProps}>
      {label}
    </button>
  )
}
