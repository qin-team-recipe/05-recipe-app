import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { PageDetailHeader } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { TwoTab } from "@/app/(app)/_component/twoTab"
import { twoTabLinkList } from "@/app/(app)/chef/[chefId]/_lib"

export const metadata = {
  title: "シェフ詳細 | シェフ一覧",
}

type ChefPageProps = {
  params: {
    chefId: string
  }
}

const ChefPage: FC<ChefPageProps> = (props) => {
  const { params } = props

  const recipeCards = Array.from({ length: 10 }).map((_, i) => {
    return <RecipeCard key={i} />
  })

  const linkList = twoTabLinkList(params.chefId)

  const chefData = {
    follower: 1234,
    img: "/chef.jpg",
    introduction:
      "初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！",
    name: "山田シェフ",
    recipeCount: 2345,
  }

  return (
    <div>
      <PageDetailHeader data={chefData} pageType="chef" />

      <div className="py-7">
        <TwoTab linkList={linkList}>
          <ContentContainer>
            <div className="grid grid-cols-2 gap-2">{recipeCards}</div>
          </ContentContainer>
        </TwoTab>
      </div>
    </div>
  )
}

export default ChefPage
