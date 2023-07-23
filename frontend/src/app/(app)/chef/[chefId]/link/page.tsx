import React, { FC } from "react"

import { Chef } from "@/app/(app)/_component/header"
import { Tab } from "@/app/(app)/_component/tab"
import { ChefPageDetail, LinkCard } from "@/app/(app)/chef/[chefId]/_component"
import { tabLinkList } from "@/app/(app)/chef/[chefId]/_lib"

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

  const chefData: Chef = {
    chefId: "foobarid",
    follower: 1234,
    img: "/chef.jpg",
    introduction:
      "初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！",
    linkList: [
      {
        linkType: "twitter",
        siteName: "Twitter",
        url: "https://twitter.com/",
      },
      {
        linkType: "youtube",
        siteName: "YouTube",
        url: "https://www.youtube.com/",
      },
      {
        linkType: "instagram",
        siteName: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
    name: "山田シェフ",
    recipeCount: 2345,
  }

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
