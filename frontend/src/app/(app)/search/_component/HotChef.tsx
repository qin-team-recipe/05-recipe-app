import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader } from "@/app/(app)/_component/header"

/** @package */
export const HotChef = () => {
  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    return (
      <div key={i} className="min-w-32 h-56 w-32 bg-tomato-5">
        山田シェフ
      </div>
    )
  })

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader title="注目のシェフ" href="/favorite" />
      </ContentContainer>

      {/* 横スクロールエリアには右paddingをつけない */}
      <ContentContainer isPaddingRight={false}>
        <ScrollAreaWrapper>
          {/* カードリストの右にだけpaddingがつくように */}
          <ContentContainer isPaddingLeft={false}>
            <div className="flex space-x-4">{chefCards}</div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
