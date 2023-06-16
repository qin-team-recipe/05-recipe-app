import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { PageDetailHeader } from "@/app/(app)/_component/header"
import { TwoTab } from "@/app/(app)/_component/twoTab"
import { twoTabLinkList } from "@/app/(app)/chef/[chefId]/_lib"

export const metadata = {
  title: "シェフ詳細 | リンク",
}

type LinkTabPageProps = {
  params: {
    chefId: string
  }
}

const LinkTabPage: FC<LinkTabPageProps> = (props) => {
  const { params } = props

  const chefCards = Array.from({ length: 4 }).map((_, i) => {
    return (
      <div key={i} className="h-20 w-full bg-tomato-5">
        Linkカード
      </div>
    )
  })

  const linkList = twoTabLinkList(params.chefId)

  return (
    <div>
      <PageDetailHeader />

      <div className="py-7">
        <TwoTab linkList={linkList}>
          <ContentContainer>
            <div>{chefCards}</div>
          </ContentContainer>
        </TwoTab>
      </div>
    </div>
  )
}

export default LinkTabPage
