"use client"

import React, { FC, ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { tv } from "tailwind-variants"

import { Link as LinkType } from "@/app/(app)/_component/tab"

type TabProps = {
  children: ReactNode
  linkList: LinkType[]
}

const tabLink = tv({
  base: "w-full border-b-2 text-center text-mauve-normal border-gray-11 pb-3",
  variants: {
    isActive: {
      false: "border-mauve-normal",
      true: "font-bold",
    },
  },
})

/** @package */
export const Tab: FC<TabProps> = (props) => {
  const { children, linkList } = props

  const pathname = usePathname()
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        {linkList.map((link) => {
          return (
            <Link
              key={String(link.href)}
              href={link.href}
              className={tabLink({
                isActive: pathname === link.pathname,
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
