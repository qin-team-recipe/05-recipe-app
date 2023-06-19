import React, { FC } from "react"
import Image from "next/image"

import { ContentContainer } from "@/app/(app)/_component/container"
import { BackButton, ChefFavButton } from "@/app/(app)/chef/[chefId]/_component"

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
        <BackButton />
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
            <div className="align-center text-mauve-dim flex gap-2 text-sm">
              <div className="align-center flex gap-1">
                <div className="round-full w-12">{data.userImg}</div>
                <div>{data.user}</div>
              </div>
              <div>
                <span className="text-mauve-normal pr-1 font-bold">
                  {data.favoriteCount}
                </span>
                フォロワー
              </div>
            </div>
          )}
        </div>
        <ChefFavButton />
      </ContentContainer>
    </div>
  )
}
