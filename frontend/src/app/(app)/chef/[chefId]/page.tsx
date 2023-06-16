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

  const chefCards = Array.from({ length: 10 }).map((_, i) => {
    return <RecipeCard key={i} />
  })

  const linkList = twoTabLinkList(params.chefId)

  return (
    <div>
      <PageDetailHeader />

      <div className="py-7">
        <TwoTab linkList={linkList}>
          <ContentContainer>
            <div className="grid grid-cols-2 gap-2">{chefCards}</div>
          </ContentContainer>
        </TwoTab>
      </div>
    </div>
  )
}

export default ChefPage
