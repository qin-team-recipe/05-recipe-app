import React, { ReactNode } from "react"

import { RecipePageDetail } from "@/app/(app)/recipe/[recipeId]/_component"

export const metadata = {
  title: "シェフやレシピを検索",
}

type RecipeDetailLayoutProps = {
  children: ReactNode
  params: {
    recipeId: string
  }
}

export default async function RecipeDetailLayout(
  props: RecipeDetailLayoutProps,
) {
  const {
    children,
    params: { recipeId },
  } = props
  const response = await fetch(`http://localhost:3000/recipe/${recipeId}/api`, {
    cache: "no-store",
  })
  const recipeData = await response.json()

  return (
    <div>
      <RecipePageDetail data={recipeData} />
      {children}
    </div>
  )
}
