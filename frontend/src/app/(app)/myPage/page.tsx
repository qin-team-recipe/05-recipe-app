import React, { FC } from "react"
import Link from "next/link"

import { getChef } from "@/mock/api"

import { ContentContainer } from "@/app/(app)/_component/container"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { MyPageDetail } from "@/app/(app)/myPage/_component"
import { tabLinkList } from "@/app/(app)/myPage/_lib"

export const metadata = {
  title: "新着レシピ｜マイページ",
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
