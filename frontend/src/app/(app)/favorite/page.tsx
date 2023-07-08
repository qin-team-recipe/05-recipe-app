import React from "react"

import { VerticalRecipeList } from "@/app/(app)/_component/recipeCard"
import {
  ChefList,
  FavoritePageHeader,
  LatestRecipe,
} from "@/app/(app)/favorite/_component"

export const metadata = {
  title: "お気に入り",
}

export default function FavoritePage() {
  return (
    <div>
      <FavoritePageHeader />
      <div className="flex-1 overflow-y-auto pb-16 pt-5 sm:py-5">
        <div className="space-y-12">
          <section>
            <ChefList />
          </section>
          <section>
            <LatestRecipe />
          </section>
          <section>
            <VerticalRecipeList label="お気に入りレシピ" />
          </section>
        </div>
      </div>
    </div>
  )
}
