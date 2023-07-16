import React, { FC } from "react"
import Image from "next/image"

import { BackButton } from "@/app/(app)/_component/backButton"
import { FollowButton } from "@/app/(app)/_component/button"
import { ContentContainer } from "@/app/(app)/_component/container"
import { Chef } from "@/app/(app)/_component/header"
import {
  CountWithLabel,
  Introduction,
  Title,
} from "@/app/(app)/_component/label"

type ChefPageDetailProps = {
  data: Chef
}

/** @package */
export const ChefPageDetail: FC<ChefPageDetailProps> = (props) => {
  const { data } = props

  return (
    <div>
      <div className="text- relative aspect-square max-h-screen w-full">
        <Image src={data.img} alt={data.name} fill className="object-cover" />
        <BackButton isFloating />
      </div>
      <ContentContainer>
        <div className="pt-4">
          <Title label={data.name} />
        </div>

        <div className="py-4">
          <Introduction label={data.introduction} />
        </div>

        <div className="align-center flex gap-2">
          <CountWithLabel count={data.recipeCount} label="レシピ" />
          <CountWithLabel count={data.follower} label="フォロワー" />
        </div>

        <div className="mt-3">
          <FollowButton pageType="chef" />
        </div>
      </ContentContainer>
    </div>
  )
}
