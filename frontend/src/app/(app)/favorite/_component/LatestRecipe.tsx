import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader, SubButtonLink } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"

/** @package */
export const LatestRecipe = () => {
  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    return (
      <RecipeCard
        summary="補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章"
        title="メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章"
        key={i}
        hasHotRecipe={true}
      />
    )
  })

  const subButtonLink = {
    // TODO: hrefの値を変更
    href: "/",
    label: "もっと見る",
  } as const satisfies SubButtonLink

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader label="新着のレシピ" subButtonLink={subButtonLink} />
      </ContentContainer>

      <ContentContainer isPaddingRight={false}>
        <ScrollAreaWrapper>
          <ContentContainer isPaddingLeft={false}>
            <div className="flex space-x-4">{chefCards}</div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
