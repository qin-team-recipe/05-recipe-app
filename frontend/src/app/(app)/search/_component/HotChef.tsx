import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { SectionHeader } from "@/app/(app)/_component/header"

/** @package */
export const HotChef = () => {
  const chefCards = Array.from({ length: 50 }).map((_, i) => {
    return (
      <div key={i} className="min-w-32 h-56 w-32 bg-tomato-5">
        山田シェフ
      </div>
    )
  })

  return (
    <div className="space-y-4">
      <SectionHeader title="注目のシェフ" href="/favorite" isMore />
      <ScrollAreaWrapper>
        <div className="flex space-x-4">{chefCards}</div>
      </ScrollAreaWrapper>
    </div>
  )
}
