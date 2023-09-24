import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { tabLinkList } from "@/app/(app)/chef/[chefId]/_lib"

type ChefPageProps = {
  params: {
    chefId: string
  }
}

const ChefPage: FC<ChefPageProps> = async (props) => {
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
    <div className="py-7">
      <Tab linkList={linkList}>
        <ContentContainer>
          <div className="grid grid-cols-2 gap-2 pt-5">{recipeCards}</div>
        </ContentContainer>
      </Tab>
    </div>
  )
}

export default ChefPage
