import React, { FC } from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader, SubButtonLink } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"

type LatestRecipeListProps = {
  isVertical?: boolean
}

/** @package */
export const LatestRecipeList: FC<LatestRecipeListProps> = (props) => {
  const { isVertical = false } = props

  // [dev]
  const recipeCards = Array.from({ length: 10 }).map((_, i) => {
    return (
      <RecipeCard
        summary="補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章"
        title="メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章"
        key={i}
        hasHotRecipe={!isVertical}
      />
    )
  })

  const subButtonLink = {
    href: "/favorite/latestRecipe",
    label: "もっと見る",
  } as const satisfies SubButtonLink

  return (
    <div className="space-y-4">
      {isVertical ? (
        <>
          <ContentContainer isPaddingRight={false}>
            <ScrollAreaWrapper orientation="vertical">
              <ContentContainer isPaddingLeft={false} isPaddingRight={true}>
                <div className="grid h-full w-full grid-cols-2 gap-x-3 gap-y-3.5">
                  {recipeCards}
                </div>
              </ContentContainer>
            </ScrollAreaWrapper>
          </ContentContainer>{" "}
        </>
      ) : (
        <>
          <ContentContainer>
            <SectionHeader label="新着のレシピ" subButtonLink={subButtonLink} />
          </ContentContainer>

          <ContentContainer isPaddingRight={false}>
            <ScrollAreaWrapper>
              <ContentContainer isPaddingLeft={false}>
                <div className="flex space-x-4">{recipeCards}</div>
              </ContentContainer>
            </ScrollAreaWrapper>
          </ContentContainer>
        </>
      )}
    </div>
  )
}
