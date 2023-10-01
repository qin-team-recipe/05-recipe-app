import React, { FC } from "react"

import { Recipe } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { tabLinkList } from "@/app/(app)/search/_lib"

type PickupRecipePageProps = {
  searchParams: {
    q?: string
  }
}

const PickupRecipePage: FC<PickupRecipePageProps> = async (props) => {
  const { searchParams } = props
  const response = await fetch(
    `http://localhost:3000/search/api/pickupRecipes`,
    {
      cache: "no-store",
    },
  )
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
  const linkList = tabLinkList({ searchParams: searchParams ?? "" })

  return (
    <div>
      <Tab linkList={linkList} />

      <div className="mt-5 px-4">
        <h3 className="text-mauve-normal text-xl font-bold">話題のレシピ</h3>
        <div className="mt-2 grid grid-cols-2 items-center gap-2">
          {recipeCards}
        </div>
      </div>
    </div>
  )
}

export default PickupRecipePage
