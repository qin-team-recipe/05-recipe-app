import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader, SubButtonLink } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"

/** @package */
export const HotRecipeList = () => {
  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    return <RecipeCard key={i} />
  })

  const subButtonLink = {
    href: "/favorite",
    label: "もっと見る",
  } as const satisfies SubButtonLink

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader label="話題のレシピ" subButtonLink={subButtonLink} />
      </ContentContainer>

      {/* 横スクロールエリアには右paddingをつけない */}
      <ContentContainer isPaddingRight={false}>
        <ScrollAreaWrapper>
          {/* カードリストの右にだけpaddingがつくように */}
          <ContentContainer isPaddingLeft={false}>
            <div className="flex w-36 space-x-4">{chefCards}</div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
