import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { MyPageDetail } from "@/app/(app)/myPage/_component"
import { tabLinkList } from "@/app/(app)/myPage/_lib"

export const metadata = {
  title: "新着レシピ｜マイページ",
}

const MyPage: FC = () => {
  const chefData = {
    chefId: "foobarid",
    follower: 1234,
    img: "/chef.jpg",
    introduction:
      "初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！",
    name: "山田シェフ",
    recipeCount: 2345,
  }

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
