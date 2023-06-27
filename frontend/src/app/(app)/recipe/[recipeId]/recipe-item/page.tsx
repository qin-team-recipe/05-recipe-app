import React, { FC } from "react"

import { PageDetailHeader } from "@/app/(app)/_component/header"
import { RecipeItem } from "@/app/(app)/_component/recipeItem"
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

type RecipeItem = {
  note: string
}

export type RecipeItemList = {
  recipeItemList: RecipeItem[]
}

const LinkTabPage: FC<LinkTabPageProps> = (props) => {
  const { params } = props
  const linkList = twoTabLinkList(params.recipeId)
  const recipeItemList: RecipeItem[] = [
    { note: "トマト１個" },
    { note: "チーズ２枚" },
    { note: "オリーブオイル少々" },
  ]

  const recipeItems = recipeItemList.map((recipeItem, i) => {
    return <RecipeItem note={recipeItem.note} key={i} />
  })

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
          {/* <ContentContainer> */}
          <div className="grid grid-cols-1 divide-y divide-mauve-8">
            {recipeItems}
          </div>
          {/* </ContentContainer> */}
        </TwoTab>
      </div>
    </div>
  )
}

export default LinkTabPage
