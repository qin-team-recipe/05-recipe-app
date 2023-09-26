import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import {
  Recipe,
  SectionHeader,
  SubButtonLink,
} from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"

/** @package */
export const HotRecipeList = async () => {
  const response = await fetch("http://localhost:3000/search/api/recipes", {
    cache: "no-store",
  })
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
            <div className="flex space-x-4">{recipeCards}</div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
