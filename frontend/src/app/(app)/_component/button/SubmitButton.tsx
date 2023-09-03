import React, { ButtonHTMLAttributes, FC } from "react"

import { tv } from "tailwind-variants"

import { formActionButton } from "@/app/(app)/_component/button/baseButton"

type SubmitButtonProps = {
  label: "登録する" | "保存する"
} & ButtonHTMLAttributes<HTMLButtonElement>

const submitButton = tv({
  base: "text-mauve-app bg-tomato-solid border-tomato-9",
  extend: formActionButton,
})

/** @package */
export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const { label, ...buttonProps } = props

  return (
    <button type="submit" className={submitButton()} {...buttonProps}>
      {label}
    </button>
  )
}
