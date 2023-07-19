"use client"

import React, { FC, useState } from "react"

import { tv } from "tailwind-variants"

import { baseActionButton } from "@/app/(app)/_component/button/baseButton"

const followButton = tv({
  extend: baseActionButton,
  variants: {
    isFollow: {
      false:
        "bg-tomato-solid text-tomato-1 border-tomato-10 dark:border-tomato-9",
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

  const buttonLabel = () => {
    if (pageType === "chef") {
      return isFollow ? "フォロー中" : "フォローする"
    } else if (pageType === "recipe") {
      return isFollow ? "お気に入りから削除" : "お気に入りに追加"
    }
  }

  return (
    <button onClick={handleClick} className={followButton({ isFollow })}>
      {buttonLabel()}
    </button>
  )
}
