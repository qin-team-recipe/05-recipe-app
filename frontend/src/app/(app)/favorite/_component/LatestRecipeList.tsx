import React, { FC } from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import {
  Recipe,
  SectionHeader,
  SubButtonLink,
} from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"

type LatestRecipeListProps = {
  isVertical?: boolean
}

/** @package */
export const LatestRecipeList: FC<LatestRecipeListProps> = async (props) => {
  const { isVertical = false } = props
  const response = await fetch(
    "http://localhost:3000/favorite/api/latestRecipes",
    {
      cache: "no-store",
    },
  )
  const json: Recipe[] = await response.json()

  const recipeCards = json.map((recipe) => {
    return (
      <RecipeCard
        summary={recipe.user}
        title={recipe.name}
        key={recipe.id}
        hasHotRecipe={true}
        favoriteCount={recipe.favoriteCount}
        img={recipe.img}
        recipeId={recipe.id}
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
