import React, { FC } from "react"
import Image from "next/image"

import { IconDotsCircleHorizontal } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { BackButton } from "@/app/(app)/_component/backButton"
import { EditButton, FollowButton } from "@/app/(app)/_component/button"
import { ContentContainer } from "@/app/(app)/_component/container"
import { MyRecipe } from "@/app/(app)/_component/header"
import {
  CountWithLabel,
  Introduction,
  Title,
} from "@/app/(app)/_component/label"
import { MyRecipeDDMenu } from "@/app/(app)/myRecipe/[myRecipeId]/_component/MyRecipeDDMenu"

type MyRecipePageDetailProps = {
  data: MyRecipe
}

const myRecipePageDetail = tv({
  slots: {
    publishLabel:
      "text-mauve-dim text-sm font-normal leading-[22px] border border-mauve-8 bg-mauve-2 rounded py-0.5 px-1.5",
  },
  variants: {
    isPublish: {
      true: {
        publishLabel: "text-tomato-11 bg-tomato-2 border-tomato-8",
      },
    },
  },
})

/** @package */
export const MyRecipePageDetail: FC<MyRecipePageDetailProps> = (props) => {
  const { data } = props

  const { publishLabel } = myRecipePageDetail({
    isPublish: data.isPublish,
  })

  return (
    <div>
      {!data.img && (
        <div className="relative aspect-square max-h-screen w-full">
          <Image src={data.img} alt={data.name} fill className="object-cover" />
          <BackButton isFloating />
        </div>
      )}

      <ContentContainer>
        {data.img && (
          <div className="flex items-center">
            <BackButton />
          </div>
        )}

        <div className="flex justify-between gap-3 pt-4">
          <Title label={data.name} />
          <MyRecipeDDMenu>
            <IconDotsCircleHorizontal className="h-6 w-6 min-w-fit cursor-pointer text-mauve-12" />
          </MyRecipeDDMenu>
        </div>

        <div className="py-4">
          <Introduction label={data.introduction} />
        </div>

        <div className="flex items-center gap-4">
          <div className={publishLabel()}>
            {data.isPublish ? "公開中" : "未公開"}
          </div>
          <CountWithLabel count={data.favoriteCount} label="お気に入り" />
        </div>

        <div className="mt-3 flex gap-4">
          <FollowButton pageType="recipe" />
          <EditButton label="レシピを編集" />
        </div>
      </ContentContainer>
    </div>
  )
}
