import React, { FC } from "react"

import { tv } from "tailwind-variants"

import { RecipeFavButton } from "@/app/(app)/_component/recipeCard/RecipeFavButton"

type RecipeCardProps = {
  hasHotRecipe?: boolean
  summary: string
  title: string
}

const recipeCard = tv({
  base: "text-mauve-normal w-fll",
  variants: {
    hasHotRecipe: { true: "w-40" },
  },
})

/** @package */
export const RecipeCard: FC<RecipeCardProps> = (props) => {
  const { hasHotRecipe = false, summary, title } = props

  return (
    <div className={recipeCard({ hasHotRecipe })}>
      <div className="bg-tomato-ui relative aspect-square w-full rounded-xl bg-[url('/recipe-images/recipe-1.jpg')] bg-cover bg-center bg-no-repeat">
        <RecipeFavButton />
      </div>
      <div className="p-1">
        <div className="text-sm font-bold line-clamp-2">{title}</div>
        <div className=" truncate text-xs text-mauve-11">{summary}</div>
      </div>
    </div>
  )
}
