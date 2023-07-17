import React from "react"

import { MyPageDetail } from "@/app/(app)/myPage/_component"

export const metadata = {
  title: "マイページ",
}

const MyPage = () => {
  const chefData = {
    chefId: "foobarid",
    follower: 1234,
    img: "/chef.jpg",
    introduction:
      "初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！",
    name: "山田シェフ",
    recipeCount: 2345,
  }

  return (
    <div>
      <MyPageDetail data={chefData} />
      マイページ
    </div>
  )
}

export default MyPage
