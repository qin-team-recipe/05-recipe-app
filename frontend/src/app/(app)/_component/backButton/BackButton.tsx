"use client"

import React, { FC } from "react"
import { Route } from "next"
import { useRouter } from "next/navigation"

import { IconArrowLeft } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

type BackButtonProps = {
  href?: Route<string>
  isFloating?: boolean
}

const backButton = tv({
  slots: {
    button: "static text-mauve-12",
    icon: "h-8 w-8",
  },
  variants: {
    isFloating: {
      false: {
        icon: "h-6 w-6",
      },
      true: {
        button:
          "absolute left-4 top-4 rounded-full bg-[#000] text-mauve-1 bg-opacity-20 h-8 w-8",
      },
    },
  },
})

/** @package */
export const BackButton: FC<BackButtonProps> = (props) => {
  const { href, isFloating = false } = props

  const router = useRouter()

  const { button, icon } = backButton({
    isFloating,
  })

  return (
    <button
      className={button()}
      onClick={() => {
        if (href) {
          return router.push(href)
        }
        return router.back()
      }}
    >
      <IconArrowLeft className={icon()} />
    </button>
  )
}
