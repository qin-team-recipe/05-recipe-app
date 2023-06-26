import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { PageDetailHeader } from "@/app/(app)/_component/header"
import { TwoTab } from "@/app/(app)/_component/twoTab"
import { twoTabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

export const metadata = {
  title: "レシピ詳細 | 材料",
}

type LinkTabPageProps = {
  params: {
    recipeId: string
  }
}

const LinkTabPage: FC<LinkTabPageProps> = (props) => {
  const { params } = props

  const linkList = twoTabLinkList(params.recipeId)

  const recipeData = {
    favoriteCount: 222,
    img: "/pizza.jpg",
    introduction:
      "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
    name: "山田の特製マルゲリータ",
    user: "山田シェフ",
    userImg: "/chef.jpg",
  }

  return (
    <div>
      <PageDetailHeader data={recipeData} pageType="recipe" />
      <div className="py-7">
        <TwoTab linkList={linkList}>
          <ContentContainer>{/* <div>{chefCards}</div> */}</ContentContainer>
        </TwoTab>
      </div>
    </div>
  )
}

export default LinkTabPage
