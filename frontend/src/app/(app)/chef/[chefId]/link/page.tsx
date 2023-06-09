import React, { FC } from "react"

import { PageDetailHeader } from "@/app/(app)/_component/header"
import { Tab } from "@/app/(app)/_component/tab"
import { LinkCard } from "@/app/(app)/chef/[chefId]/_component"
import { tabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

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

  const linkList = tabLinkList(params.chefId)

  const chefData = {
    follower: 1234,
    img: "/chef.jpg",
    introduction:
      "初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！",
    name: "山田シェフ",
    recipeCount: 2345,
  }

  return (
    <div>
      <PageDetailHeader data={chefData} pageType="chef" />
      <div className="py-7">
        <Tab linkList={linkList}>
          <div>{chefCards}</div>
        </Tab>
      </div>
    </div>
  )
}

export default LinkTabPage
