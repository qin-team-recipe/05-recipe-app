import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"

import { BackButton } from "@/app/(app)/_component/backButton"
import { FollowButton } from "@/app/(app)/_component/button"
import { ContentContainer } from "@/app/(app)/_component/container"
import { Recipe } from "@/app/(app)/_component/header"
import {
  CountWithLabel,
  Introduction,
  Title,
} from "@/app/(app)/_component/label"

type RecipePageDetailProps = {
  data: Recipe
}
export const RecipePageDetail: FC<RecipePageDetailProps> = (props) => {
  const { data } = props

  return (
    <div>
      <div className="relative aspect-square max-h-screen w-full">
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
          <Link className="align-center flex gap-1" href="/">
            <div className="aspect-square w-6 rounded-full bg-gray-7"></div>
            <div>{data.user}</div>
          </Link>
          <CountWithLabel count={data.favoriteCount} label="お気に入り" />
        </div>

        <div className="mt-3">
          <FollowButton pageType="recipe" />
        </div>
      </ContentContainer>
    </div>
  )
}
