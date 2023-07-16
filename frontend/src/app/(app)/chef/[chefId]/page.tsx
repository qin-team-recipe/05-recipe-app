import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { ChefPageDetail } from "@/app/(app)/chef/[chefId]/_component"
import { tabLinkList } from "@/app/(app)/chef/[chefId]/_lib"

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

  const linkList = tabLinkList(params.chefId)

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
      <ChefPageDetail data={chefData} />

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

export default ChefPage
