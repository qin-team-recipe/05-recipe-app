import React, { FC } from "react"
import Link from "next/link"

import { getChef } from "@/mock/api"

import { ContentContainer } from "@/app/(app)/_component/container"
import { Recipe } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { MyPageDetail } from "@/app/(app)/myPage/_component"
import { tabLinkList } from "@/app/(app)/myPage/_lib"

export const metadata = {
  title: "新着レシピ｜マイページ",
}

const MyPage: FC = async () => {
  const response = await fetch(
    `http://localhost:3000/myPage/api/latestRecipes`,
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
        createdAt={recipe.createdAt}
      />
    )
  })

  const linkList = tabLinkList()
  const chefData = getChef("1")

  return (
    <div>
      <MyPageDetail data={chefData} />
      <div className="relative py-7">
        <Tab linkList={linkList}>
          <ContentContainer>
            <div className="grid grid-cols-2 gap-2 pt-5">{recipeCards}</div>
          </ContentContainer>
        </Tab>
        {/* TODO:遷移先をレシピ新規作成画面に修正 */}
        <Link
          href="/search"
          className="fixed bottom-10 right-1/2 translate-x-1/2 transform rounded-full bg-tomato-9 px-3 py-2 text-mauve-1 shadow-xl sm:right-1/2 sm:translate-x-48"
        >
          <strong className="bold">マイレシピ</strong>を追加する
        </Link>
      </div>
    </div>
  )
}

export default MyPage
