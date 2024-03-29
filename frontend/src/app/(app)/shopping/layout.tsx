import React, { ReactNode } from "react"

type ShoppingLayoutProps = {
  children: ReactNode
}

const ShoppingLayoutAddLayout = (props: ShoppingLayoutProps) => {
  const { children } = props

  return <div className="h-screen bg-mauve-2">{children}</div>
}

export default ShoppingLayoutAddLayout
