"use client"

import React, { FC } from "react"
import { useRouter } from "next/navigation"

import { tv } from "tailwind-variants"

import { baseActionButton } from "@/app/(app)/_component/button/baseButton"

type EditButtonProps = {
  label: "プロフィールを編集" | "レシピを編集"
}

const editButton = tv({
  base: "text-mauve-12 border-tomato-12 border-[0.5px] dark:border-mauve-12",
  extend: baseActionButton,
})

/** @package */
export const EditButton: FC<EditButtonProps> = (props) => {
  const { label } = props

  const router = useRouter()

  const handleClick = () => {
    if (label === "プロフィールを編集") {
      router.push("/myPage/edit")
    } else {
      // TODO: レシピの編集ページへの遷移
      // router.push("/recipe/edit")
      router.push("/search")
    }
  }

  return (
    <button onClick={handleClick} className={editButton()}>
      {label}
    </button>
  )
}
