import React, { FC, ReactNode } from "react"
import Link from "next/link"

type ListItemProps = {
  children: ReactNode
  type: "internal" | "external" | "logout" | "withdrawal"
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { children, type } = props

  if (type === "internal" || type === "external")
    return (
      <Link href="/" className="flex items-center justify-between py-3">
        {children}
      </Link>
    )
  else
    return (
      <button className="flex items-center justify-between py-3">
        {children}
      </button>
    )
}
