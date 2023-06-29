import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import {
  PageDetailHeader,
  SectionHeader,
  SubButtonLink,
} from "@/app/(app)/_component/header"
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

  const subButtonLink = {
    href: "/favorite",
    label: "まとめてお買物に追加",
  } as const satisfies SubButtonLink

  return (
    <div>
      <PageDetailHeader data={recipeData} pageType="recipe" />
      <div className="py-7">
        <TwoTab linkList={linkList}>
          <ContentContainer>
            <SectionHeader label="２人前" subButtonLink={subButtonLink} />
          </ContentContainer>
          <div className="my-2 grid grid-cols-1 divide-y divide-mauve-8">
            {recipeItems}
          </div>
        </TwoTab>
      </div>
    </div>
  )
}

export default LinkTabPage
