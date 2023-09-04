import React, { ReactNode } from "react"

type MyPageEditLayoutProps = {
  children: ReactNode
}

const MyPageEditLayout = (props: MyPageEditLayoutProps) => {
  const { children } = props

  return <div className="h-screen bg-mauve-2">{children}</div>
}

export default MyPageEditLayout
