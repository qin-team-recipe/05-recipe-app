"use client"

import React, { FC, ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { tv } from "tailwind-variants"

import { Link as LinkType } from "@/app/(app)/_component/twoTab"

type TwoTabProps = {
  children: ReactNode
  linkList: LinkType[]
}

const twoTabLink = tv({
  base: "border-b-2 text-center text-mauve-normal border-gray-11 pb-3",
  variants: {
    isActive: {
      false: "border-mauve-normal",
      true: "font-bold",
    },
  },
})

/** @package */
export const TwoTab: FC<TwoTabProps> = (props) => {
  const { children, linkList } = props

  const pathname = usePathname()

  return (
    <div className="flex flex-col">
      <div className="grid w-full grid-cols-2">
        {linkList.map((link) => {
          return (
            <Link
              key={String(link.href)}
              href={link.href}
              className={twoTabLink({
                isActive: pathname === link.href,
              })}
            >
              {link.tabLabel}
            </Link>
          )
        })}
      </div>
      <div>{children}</div>
    </div>
  )
}
