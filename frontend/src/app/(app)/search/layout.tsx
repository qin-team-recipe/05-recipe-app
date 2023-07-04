import React, { ReactNode } from "react"

import { SearchHeader } from "@/app/(app)/search/_component"

type SearchLayoutProps = {
  children: ReactNode
}

export default function SearchLayout(props: SearchLayoutProps) {
  const { children } = props

  return (
    <div className="flex h-full flex-col overscroll-y-contain">
      <div className="p-3">
        <SearchHeader />
      </div>
      <div className="flex-1 overflow-y-auto pb-16 pt-5 sm:py-5">
        {children}
      </div>
    </div>
  )
}
