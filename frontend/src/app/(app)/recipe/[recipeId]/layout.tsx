import React, { ReactNode } from "react"
import type { Metadata } from "next"

import { Recipe } from "@/app/(app)/_component/header"
import { RecipePageDetail } from "@/app/(app)/recipe/[recipeId]/_component"

export const generateMetadata = async ({
  params: { recipeId },
}: RecipeDetailLayoutProps): Promise<Metadata> => {
  const response = await fetch(`http://localhost:3000/recipe/${recipeId}/api`, {
    cache: "no-store",
  })
  const recipeData: Recipe = await response.json()

  return {
    openGraph: {
      images: [recipeData.img],
    },
    title: recipeData.name,
  }
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
