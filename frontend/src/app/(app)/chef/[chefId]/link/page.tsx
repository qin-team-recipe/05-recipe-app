import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { PageDetailHeader } from "@/app/(app)/_component/header"
import { TwoTab } from "@/app/(app)/_component/twoTab"
import { LinkCard } from "@/app/(app)/chef/[chefId]/_component"
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
    type DummydataType = {
      accountId?: string
      linkType: "twitter" | "instagram" | "others"
      siteName?: string
      snsFollower?: number
      url: string
    }

    const website: DummydataType = {
      accountId: undefined,
      linkType: "others",
      siteName: "",
      snsFollower: undefined,
      url: "",
    }
    if (i === 0) {
      website.url = "https://about.twitter.com/ja"
      website.linkType = "twitter"
      website.accountId = "@hogehogeman"
      website.snsFollower = 123
    } else if (i === 1) {
      website.url = "https://www.instagram.com/"
      website.linkType = "instagram"
      website.accountId = "@fugramaer"
      website.snsFollower = 300
    } else {
      website.siteName = "ほげふーふーがどっとこむ"
      website.url = "#"
      website.linkType = "others"
    }
    return (
      <LinkCard
        key={i}
        siteName={website.siteName}
        url={website.url}
        linkType={website.linkType}
        snsFollower={website.snsFollower}
        accountId={website.accountId}
      />
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
