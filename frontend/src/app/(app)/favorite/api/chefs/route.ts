import { NextResponse } from "next/server"

import { TChef, TLink } from "@/type"

import { getRandomInt } from "@/app/_lib"

export const GET = async () => {
  const chefNames: string[] = [
    "山田シェフ",
    "田中シェフ",
    "しまぶー",
    "花子",
    "一郎",
  ]
  const favoriteChefs: TChef[] = Array.from({
    length: 10,
  }).map((_, i) => {
    const randomNum = getRandomInt(5)
    const chefName = `${chefNames[randomNum]}${i}`

    return {
      id: `${i}`,
      follower: getRandomInt(1000),
      img: {
        key: "1",
        name: `${chefName}`,
        url: `/chef-images/chef-${getRandomInt(randomNum) + 1}.jpg`,
      },
      introduction: "シェフの紹介文",
      isFollow: true,
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
      ] as TLink[],
      name: `${chefName}`,
    }
  })
  return NextResponse.json(favoriteChefs)
}
