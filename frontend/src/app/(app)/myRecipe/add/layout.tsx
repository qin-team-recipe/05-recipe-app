import React, { ReactNode } from "react"

type MyRecipeAddLayoutProps = {
  children: ReactNode
}

const MyRecipeAddLayout = (props: MyRecipeAddLayoutProps) => {
  const { children } = props

  return <div className="h-screen bg-mauve-2">{children}</div>
}

export default MyRecipeAddLayout
