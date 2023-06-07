import React, { ReactNode } from "react"

import { SearchHeader } from "./_component"

type SearchLayoutProps = {
  children: ReactNode
}

export default function SearchLayout(props: SearchLayoutProps) {
  const { children } = props

  return (
    <div className="flex h-full flex-col overscroll-y-contain">
      <header className="mb-auto mt-0 w-full">
        <SearchHeader />
      </header>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
