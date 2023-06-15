import React, { FC } from "react"
import Image from "next/image"

import { ContentContainer } from "@/app/(app)/_component/container"
import { BackButton, ChefFavButton } from "@/app/(app)/chef/[chefId]/_component"

/** @package */
export const PageDetailHeader: FC = () => {
  return (
    <div>
      <div className="relative h-96 max-h-screen w-full">
        <Image src="/chef.jpg" alt="chef" fill className="h-3/4 object-cover" />
        <BackButton />
      </div>
      <ContentContainer>
        <div className="text-mauve-normal">
          <h1 className="pt-4 text-2xl font-bold">山田シェフ</h1>
          <div className="py-4">
            初の絵本出版！『まねっこシェフ』・ふわふわ！スクランブルエッグ・にぎにぎ！おにぎり主婦の友社より３月３日、２冊同時発売！絶賛発売中！
          </div>
          <div className="align-center text-mauve-dim flex gap-2 text-sm">
            <div>
              <span className="text-mauve-normal pr-1 font-bold">2,345</span>レシピ
            </div>
            <div>
              <span className="text-mauve-normal pr-1 font-bold">1,234</span>フォロワー
            </div>
          </div>
        </div>
        <ChefFavButton />
      </ContentContainer>
    </div>
  )
}
