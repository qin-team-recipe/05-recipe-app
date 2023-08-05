import React, { FC } from "react"
import Link from "next/link"

import { ContentContainer } from "@/app/(app)/_component/container"
import { Chef } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { MyPageDetail } from "@/app/(app)/myPage/_component"
import { tabLinkList } from "@/app/(app)/myPage/_lib"

export const metadata = {
  title: "新着レシピ｜マイページ",
}

const MyPage: FC = () => {
  const chefData: Chef = {
    chefId: "foobarid",
    follower: 1234,
    img: "/chef.jpg",
    introduction:
      "初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！",
    linkList: [
      {
        linkType: "twitter",
        siteName: "Twitter",
        url: "https://twitter.com/",
      },
      {
        linkType: "youtube",
        siteName: "YouTube",
        url: "https://www.youtube.com/",
      },
      {
        linkType: "instagram",
        siteName: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
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
