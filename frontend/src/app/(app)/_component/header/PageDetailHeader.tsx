import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"

import { BackButton } from "@/app/(app)/_component/backButton"
import { ContentContainer } from "@/app/(app)/_component/container"
import { FollowButton } from "@/app/(app)/chef/[chefId]/_component"

type Common = {
  img: string
  introduction: string
  name: string
}

type Chef = {
  follower: number
  recipeCount: number
} & Common

type Recipe = {
  favoriteCount: number
  user: string
  userImg: string
} & Common

type DetailHeroProps<T extends "chef" | "recipe"> = T extends "chef"
  ? { data: Chef; pageType: T }
  : { data: Recipe; pageType: T }

/** @package */
export const PageDetailHeader: FC<DetailHeroProps<"chef" | "recipe">> = (
  props,
) => {
  const { data, pageType } = props
  return (
    <div>
      <div className="relative aspect-square max-h-screen w-full">
        <Image src={data.img} alt={data.name} fill className="object-cover" />
        <BackButton isFloating />
      </div>
      <ContentContainer>
        <div className="text-mauve-normal">
          <h1 className="pt-4 text-2xl font-bold">{data.name}</h1>
          <div className="py-4">{data.introduction}</div>
          {pageType == "chef" ? (
            <div className="align-center text-mauve-dim flex gap-2 text-sm">
              <div>
                <span className="text-mauve-normal pr-1 font-bold">
                  {data.recipeCount}
                </span>
                レシピ
              </div>
              <div>
                <span className="text-mauve-normal pr-1 font-bold">
                  {data.follower}
                </span>
                フォロワー
              </div>
            </div>
          ) : (
            <div className="align-center text-mauve-normal flex gap-2 text-sm">
              <Link className="align-center flex gap-1" href="/">
                <div className="aspect-square w-6 rounded-full bg-gray-7"></div>
                <div>{data.user}</div>
              </Link>
              <div>
                <span className="text-mauve-normal pr-1 font-bold">
                  {data.favoriteCount}
                </span>
                お気に入り
              </div>
            </div>
          )}
        </div>
        <FollowButton pageType={pageType} />
      </ContentContainer>
    </div>
  )
}
