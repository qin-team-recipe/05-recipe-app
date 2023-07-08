import React, { FC } from "react"

import { IconCopy } from "@tabler/icons-react"

import { ContentContainer } from "@/app/(app)/_component/container"
import {
  PageDetailHeader,
  SectionHeader,
  SubButtonLink,
} from "@/app/(app)/_component/header"
import { RecipeItem } from "@/app/(app)/_component/recipeItem"
import { Tab } from "@/app/(app)/_component/tab"
import { tabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

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
  const linkList = tabLinkList(params.recipeId)
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
        <Tab linkList={linkList}>
          <div className="my-2 grid grid-cols-1 divide-y divide-mauve-8">
            <ContentContainer>
              <SectionHeader label="２人前" subButtonLink={subButtonLink} />
            </ContentContainer>
            {recipeItems}
          </div>
        </Tab>
        <div className="flex justify-end px-4">
          <button className="flex text-blue-11 active:opacity-95">
            <IconCopy />
            コピーする
          </button>
        </div>
      </div>
    </div>
  )
}

export default LinkTabPage
