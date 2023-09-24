import { NextResponse } from "next/server"

export const GET = async (
  _: Request,
  { params }: { params: { chefId: string } },
) => {
  const chefId = params.chefId

  const chefData = chefList.find((chef) => {
    const isChef = chef.chefId === Number(chefId)

    return isChef
  })

  return NextResponse.json(chefData)
}

const chefList = [
  {
    chefId: 1111,
    follower: 1234,
    img: `/chef-images/chef-1.jpg`,
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
  },
  {
    chefId: 2222,
    follower: 11155,
    img: `/chef-images/chef-2.jpg`,
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
    name: "斎藤シェフ",
    recipeCount: 2348,
  },
  {
    chefId: 3333,
    follower: 14755,
    img: `/chef-images/chef-3.jpg`,
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
    name: "近藤シェフ",
    recipeCount: 2366,
  },
  {
    chefId: 4444,
    follower: 2100,
    img: `/chef-images/chef-4.jpg`,
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
    name: "森シェフ",
    recipeCount: 13,
  },
  {
    chefId: 5555,
    follower: 8200,
    img: `/chef-images/chef-5.jpg`,
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
    name: "山本シェフ",
    recipeCount: 5,
  },
]
