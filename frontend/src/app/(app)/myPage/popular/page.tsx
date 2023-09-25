import React, { FC } from "react"

import { getChef } from "@/mock/api"

import { ContentContainer } from "@/app/(app)/_component/container"
import { Recipe } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { MyPageDetail } from "@/app/(app)/myPage/_component"
import { tabLinkList } from "@/app/(app)/myPage/_lib"

export const metadata = {
  title: "人気レシピ｜マイページ",
}

const MyPage: FC = async () => {
  const response = await fetch(
    `http://localhost:3000/myPage/api/popularRecipes`,
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

  const linkList = tabLinkList()
  const chefData = getChef("1")

  return (
    <div>
      <MyPageDetail data={chefData} />

      <div className="py-7">
        <Tab linkList={linkList}>
          <ContentContainer>
            <div className="grid grid-cols-2 gap-2 pt-5">{recipeCards}</div>
          </ContentContainer>
        </Tab>
      </div>
    </div>
  )
}

export default MyPage
