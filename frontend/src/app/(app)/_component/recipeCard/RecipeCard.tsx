import React, { FC } from "react"

import { RecipeFavButton } from "@/app/(app)/_component/recipeCard"

/** @package */
export const RecipeCard: FC = () => {
  return (
    <div className="text-mauve-normal w-36">
      <div className="bg-tomato-ui relative aspect-square w-full rounded-xl bg-[url('/pizza.jpg')] bg-cover bg-center bg-no-repeat">
        <RecipeFavButton />
      </div>
      <div className="p-1">
        <div className="text-sm font-bold line-clamp-2">
          メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章
        </div>
        <div className=" truncate text-xs">
          補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章
        </div>
      </div>
    </div>
  )
}
