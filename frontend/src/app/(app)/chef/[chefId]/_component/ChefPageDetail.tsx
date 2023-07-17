import React, { FC } from "react"
import Image from "next/image"

import { IconDotsCircleHorizontal } from "@tabler/icons-react"

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
      <ContentContainer>
        <div className="flex items-center justify-between pt-3">
          {/* TODO: historyがある場合はback、ない場合はsearchへ */}
          <BackButton href="/search" />

          {/* NOTE: 各リンクのアイコンを横並びにする */}
          <div>
            <IconDotsCircleHorizontal className="h-6 w-6 text-mauve-12" />
          </div>
        </div>

        <div className="flex items-start justify-between pt-4">
          <div>
            <Title label={data.name} />
            <p>{data.chefId}</p>
          </div>

          {data.img ? (
            <Image
              src={data.img}
              alt="profile"
              width={63}
              height={63}
              className="object-fit aspect-square rounded-full"
            />
          ) : null}
        </div>

        {data.introduction ? (
          <div className="pt-2">
            <Introduction label={data.introduction} />
          </div>
        ) : null}

        <div className="align-center flex gap-2 pt-2">
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
