import React, { FC } from "react"

import { getChef } from "@/mock/api"

import { ContentContainer } from "@/app/(app)/_component/container"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { MyPageDetail } from "@/app/(app)/myPage/_component"
import { tabLinkList } from "@/app/(app)/myPage/_lib"

export const metadata = {
  title: "人気レシピ｜マイページ",
}

const MyPage: FC = () => {
  const recipeCards = Array.from({ length: 10 }).map((_, i) => {
    return (
      <RecipeCard
        summary="補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章"
        title="メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章"
        key={i}
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
