import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { PageDetailHeader } from "@/app/(app)/_component/header"
import { TwoTab } from "@/app/(app)/_component/twoTab"
import { RecipeItem } from "@/app/(app)/recipe/[recipeId]/_component"
import { twoTabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

export const metadata = {
  title: "レシピ詳細",
}

type RecipePageProps = {
  params: {
    recipeId: string
  }
}

const RecipePage: FC<RecipePageProps> = (props) => {
  const { params } = props

  const recipeItems = Array.from({ length: 10 }).map((_, i) => {
    return <RecipeItem key={i} />
  })

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
          <ContentContainer>
            <div className="grid grid-cols-2 gap-2">{recipeItems}</div>
          </ContentContainer>
        </TwoTab>
      </div>
    </div>
  )
}

export default RecipePage
