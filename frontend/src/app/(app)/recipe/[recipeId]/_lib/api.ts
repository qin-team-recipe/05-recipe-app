import { baseUrl } from "@/mock"

import { Recipe } from "@/app/(app)/_component/header"

/** @package */
export const getRecipe = async (recipeId: string): Promise<Recipe> => {
  const res = await fetch(`${baseUrl}/recipe/${recipeId}`, {
    method: "GET",
  })
  return (await res.json()) as Recipe
}
