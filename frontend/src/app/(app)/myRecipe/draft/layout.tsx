import React, { ReactNode } from "react"

type DraftLayoutProps = {
  children: ReactNode
}

const DraftLayout = (props: DraftLayoutProps) => {
  const { children } = props

  return <div className="h-screen bg-mauve-2">{children}</div>
}

export default DraftLayout
