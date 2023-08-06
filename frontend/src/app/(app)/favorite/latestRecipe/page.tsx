import React, { FC } from "react"

import { LatestRecipeList } from "@/app/(app)/favorite/_component"
import { LatestRecipesPageHeader } from "@/app/(app)/favorite/latestRecipe/_component"

const LatestRecipesPage: FC = () => {
  return (
    <div>
      <LatestRecipesPageHeader />
      <div className="flex-1 overflow-y-auto pb-16 pt-5 sm:py-5">
        <div className="space-y-12">
          <section>
            <LatestRecipeList isVertical={true} />
          </section>
        </div>
      </div>
    </div>
  )
}
export default LatestRecipesPage
