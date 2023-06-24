"use client"

import React, { FC, useState } from "react"

import { tv } from "tailwind-variants"

const color = tv({
  base: `rounded-md border px-3 mt-3`,
  variants: {
    isFollow: {
      false: `bg-tomato-solid text-tomato-1 border-tomato-10 dark:border-tomato-9`,
      true: "bg-tomato-ghost text-tomato-dim",
    },
  },
})

type FollowButtonProps = {
  pageType: "chef" | "recipe"
}

/** @package */
export const FollowButton: FC<FollowButtonProps> = (props) => {
  const { pageType } = props
  const [isFollow, setIsFollow] = useState<boolean>(false)

  const handleClick = () => {
    setIsFollow((isFollow) => {
      return !isFollow
    })
  }

  return (
    <button onClick={handleClick} className={color({ isFollow })}>
      {pageType === "chef"
        ? isFollow
          ? "フォロー中"
          : "フォローする"
        : isFollow
        ? "お気に入りから削除"
        : "お気に入りに追加"}
    </button>
  )
}
