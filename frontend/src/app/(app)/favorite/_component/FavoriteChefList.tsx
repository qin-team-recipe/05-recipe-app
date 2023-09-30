import React from "react"

import { TChefList } from "@/type"

import { ScrollAreaWrapper } from "@/app/_component"
import { ChefCard } from "@/app/(app)/_component/chefCard"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader } from "@/app/(app)/_component/header"

/** @package */
export const FavoriteChefList = async () => {
  const res = await fetch("http://localhost:3000/favorite/api/chefs", {
    cache: "no-store",
  })
  const json: TChefList = await res.json()

  const chefCards = json.map((chef) => {
    return (
      <ChefCard
        key={chef.id}
        cardType="round"
        name={chef.name}
        img={chef.img?.url}
      />
    )
  })

  return (
    <div className="space-y-4">
      <ContentContainer>
        {/*TODO: もっと見るボタンの情報追加（subButtonLink）*/}
        <SectionHeader label="シェフ" />
      </ContentContainer>

      {/* 横スクロールエリアには右paddingをつけない */}
      <ContentContainer isPaddingRight={false}>
        <ScrollAreaWrapper>
          {/* カードリストの右にだけpaddingがつくように */}
          <ContentContainer isPaddingLeft={false} isPaddingRight={true}>
            <div className="flex space-x-4">{chefCards}</div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
