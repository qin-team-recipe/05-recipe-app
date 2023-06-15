import React from "react"
import Image from "next/image"

import { ContentContainer } from "@/app/(app)/_component/container"
import { ChefFavButton } from "@/app/(app)/chef/[chefId]/_component"

export const metadata = {
  title: "シェフ詳細",
}

export default function ChefPage() {
  return (
    <div>
      <div className="relative h-96 max-h-screen w-full">
        <Image src="/chef.jpg" alt="" fill className="h-3/4 object-cover" />
      </div>
      <ContentContainer>
        <div className="text-mauve-normal">
          <h1 className="pt-4 text-2xl font-bold">山田シェフ</h1>
          <div className="py-4">
            初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！
          </div>
          <div className="text-mauve-dim text-sm">
            <span className="text-mauve-normal pr-1 font-bold">456</span>フォロワー
          </div>
        </div>
        <ChefFavButton />
      </ContentContainer>
    </div>
  )
}
