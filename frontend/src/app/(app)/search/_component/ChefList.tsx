import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ChefCard } from "@/app/(app)/_component/chefCard"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader, SubButtonLink } from "@/app/(app)/_component/header"

/** @package */
export const ChefList = () => {
  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    const introduction =
      "白ごはん.comを運営しています。アップしたレシピの紹介や、youtube動画、日々の食のこと、オリジナル商品などの案内等をブログでやっています。"
    const name = "山田シェフ"
    const img = "/chef.jpeg"
    return (
      <ChefCard
        key={i}
        hasDescription={true}
        introduction={introduction}
        name={name}
        img={img}
      />
    )
  })

  const subButtonLink = {
    href: "/favorite",
    label: "もっと見る",
  } as const satisfies SubButtonLink

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader label="シェフ" subButtonLink={subButtonLink} />
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
