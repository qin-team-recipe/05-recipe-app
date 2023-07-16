import React, { ReactNode } from "react"

type FavoriteLayoutProps = {
  children: ReactNode
}

export default function FavoriteLayout(props: FavoriteLayoutProps) {
  const { children } = props
  return <div>{children}</div>
}
