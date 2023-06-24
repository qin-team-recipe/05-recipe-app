import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ChefCard } from "@/app/(app)/_component/chefCard"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader } from "@/app/(app)/_component/header"

/** @package */
export const HotChefList = () => {
  const name = "山田シェフ"
  const img = "/chef.jpeg"
  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    return <ChefCard key={i} cardType="round" name={name} img={img} />
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
