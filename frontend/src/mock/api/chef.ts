import { Chef } from "@/app/(app)/_component/header"

/** @package */
export const get = (chefId: string): Chef => {
  return {
    chefId: chefId,
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
}
