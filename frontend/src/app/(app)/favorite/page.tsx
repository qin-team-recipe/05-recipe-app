import React from "react"

import {
  FavoriteChefList,
  FavoritePageHeader,
  FavoriteRecipeList,
  LatestRecipeList,
} from "@/app/(app)/favorite/_component"

export const metadata = {
  title: "お気に入り",
}

export const FavoritePage = () => {
  return (
    <div>
      <FavoritePageHeader />
      <div className="flex-1 overflow-y-auto pb-16 pt-5 sm:py-5">
        <div className="space-y-12">
          <section>
            <FavoriteChefList />
          </section>
          <section>
            <LatestRecipeList />
          </section>
          <section>
            <FavoriteRecipeList />
          </section>
        </div>
      </div>
    </div>
  )
}

export default FavoritePage
