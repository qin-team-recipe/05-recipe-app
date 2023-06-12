import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader } from "@/app/(app)/_component/header"

/** @package */
export const ChefList = () => {
  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    return (
      <div key={i} className="min-w-22 h-36 w-24 bg-tomato-5">
        山田シェフ
      </div>
    )
  })

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader title="シェフ" href="/favorite" isMore />
      </ContentContainer>

      {/* 横スクロールエリアには右paddingをつけない */}
      <ContentContainer isPaddingRight={false}>
        <ScrollAreaWrapper orientation="vertical">
          {/* カードリストの右にだけpaddingがつくように */}
          <ContentContainer isPaddingLeft={false}>
            <div className="flex flex-col space-y-4">{chefCards}</div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
