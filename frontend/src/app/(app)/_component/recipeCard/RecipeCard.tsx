import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"

import { tv } from "tailwind-variants"

import { RecipeFavButton } from "@/app/(app)/_component/recipeCard/RecipeFavButton"

type RecipeCardProps = {
  createdAt?: string
  favoriteCount: number
  hasHotRecipe?: boolean
  img: string
  recipeId: number
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
  const {
    createdAt,
    favoriteCount,
    hasHotRecipe = false,
    img,
    recipeId,
    summary,
    title,
  } = props
  return (
    <Link href={`/recipe/${recipeId}`} className={recipeCard({ hasHotRecipe })}>
      <div className="bg-tomato-ui relative aspect-square overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat">
        <Image
          src={img ? img : "/recipe-images/recipe-1.jpg"}
          fill
          alt={title}
          className="w-full"
        />
        <RecipeFavButton favoriteCount={favoriteCount} />
      </div>
      <div className="p-1">
        <div className="text-sm font-bold line-clamp-2">{title}</div>
        <div className="truncate text-xs text-mauve-11">{summary}</div>
        <span className="truncate text-xs text-mauve-11">{createdAt}</span>
      </div>
    </Link>
  )
}
