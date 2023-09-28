import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { Recipe, SectionHeader } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"

/** @package */
export const FavoriteRecipeList = async () => {
  const res = await fetch(
    "http://localhost:3000/favorite/api/favoriteRecipes",
    {
      cache: "no-store",
    },
  )
  const json: Recipe[] = await res.json()

  const recipeCards = json.map((recipe) => {
    return (
      <RecipeCard
        summary={recipe.user}
        title={recipe.name}
        key={recipe.id}
        hasHotRecipe={false}
        favoriteCount={recipe.favoriteCount}
        img={recipe.img}
        recipeId={recipe.id}
      />
    )
  })

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader label="お気に入りレシピ" />
      </ContentContainer>
      <ContentContainer isPaddingRight={false}>
        <ScrollAreaWrapper orientation="vertical">
          <ContentContainer isPaddingLeft={false} isPaddingRight={true}>
            <div className="grid h-full w-full grid-cols-2 gap-x-3 gap-y-3.5">
              {recipeCards}
            </div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
