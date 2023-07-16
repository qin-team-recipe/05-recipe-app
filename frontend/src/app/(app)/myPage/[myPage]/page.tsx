import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { MyPageHeader } from "@/app/(app)/myPage/[myPage]/_component"
import { tabLinkList } from "@/app/(app)/myPage/[myPage]/_lib"

export const metadata = {
  title: "新着レシピ｜マイページ",
}

type MyPageProps = {
  params: {
    chefId: string
  }
}

const MyPage: FC<MyPageProps> = (props) => {
  const { params } = props

  const recipeCards = Array.from({ length: 10 }).map((_, i) => {
    return (
      <RecipeCard
        summary="補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章"
        title="メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章"
        key={i}
      />
    )
  })

  const linkList = tabLinkList(params.chefId)

  return (
    <div>
      <MyPageHeader />
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
