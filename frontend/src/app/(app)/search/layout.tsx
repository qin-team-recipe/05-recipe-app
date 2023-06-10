import React, { ReactNode } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { SearchHeader } from "@/app/(app)/search/_component"

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
      <div className="flex-1 overflow-y-auto">
        <ContentContainer>{children}</ContentContainer>
      </div>
    </div>
  )
}
