import React, { FC } from "react"

import { Tab } from "@/app/(app)/_component/tab"
import { ChefPageDetail, LinkCard } from "@/app/(app)/chef/[chefId]/_component"
import { getChef, tabLinkList } from "@/app/(app)/chef/[chefId]/_lib"

export const metadata = {
  title: "シェフ詳細 | リンク",
}

type LinkTabPageProps = {
  params: {
    chefId: string
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

  const linkList = tabLinkList(params.chefId)

  const chefData = await getChef(params.chefId)

  return (
    <div>
      <ChefPageDetail data={chefData} />

      <div className="py-7">
        <Tab linkList={linkList}>
          <div>{chefCards}</div>
        </Tab>
      </div>
    </div>
  )
}

export default LinkTabPage
