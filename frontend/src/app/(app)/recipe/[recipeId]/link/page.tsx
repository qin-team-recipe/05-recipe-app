import React, { FC } from "react"

import { Tab } from "@/app/(app)/_component/tab"
import { LinkCard } from "@/app/(app)/chef/[chefId]/_component"
import { tabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

export const metadata = {
  title: "レシピ詳細 | リンク",
}

type LinkTabPageProps = {
  params: {
    recipeId: string
  }
}

const LinkTabPage: FC<LinkTabPageProps> = async (props) => {
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

  const linkList = tabLinkList(params.recipeId)
  return (
    <div className="py-7">
      <Tab linkList={linkList}>
        <div>{chefCards}</div>
      </Tab>
    </div>
  )
}

export default LinkTabPage
