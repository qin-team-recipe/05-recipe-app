import React, { FC } from "react"
import { Route } from "next"
import Link from "next/link"

type SectionHeaderProps<T extends string> = {
  href: Route<T> | URL
  isMore?: boolean
  title: string
}

/** @package */
export const SectionHeader: FC<SectionHeaderProps<string>> = (
  props,
) => {
  const { href, isMore = false, title } = props

  return (
    <div className="flex items-end justify-between font-bold">
      <h3 className="text-mauve-normal text-xl">{title}</h3>
      {isMore ? (
        <div className="text-mauve-dim">
          <Link href={href}>もっと見る</Link>
        </div>
      ) : null}
    </div>
  )
}
