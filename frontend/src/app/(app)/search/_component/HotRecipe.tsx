import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"

/** @package */
export const HotRecipe = () => {
  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    return <RecipeCard key={i} />
  })

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader title="話題のレシピ" href="/favorite" isMore />
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
