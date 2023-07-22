import React, { FC } from "react"
import Image from "next/image"

import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconDotsCircleHorizontal,
} from "@tabler/icons-react"

import { BackButton } from "@/app/(app)/_component/backButton"
import { EditButton } from "@/app/(app)/_component/button"
import { ContentContainer } from "@/app/(app)/_component/container"
import { Link, MyPage } from "@/app/(app)/_component/header"
import {
  CountWithLabel,
  Introduction,
  Title,
} from "@/app/(app)/_component/label"

type MyPageDetailProps = {
  data: MyPage
}

/** @package */
export const MyPageDetail: FC<MyPageDetailProps> = (props) => {
  const { data } = props

  const displayLinkIconList = (link: Link) => {
    // if (link.linkType === "twitter") {
    //   return <IconBrandTwitter className="h-6 w-6 text-mauve-12" />
    // }
    if (link.linkType === "instagram") {
      return <IconBrandInstagram className="h-6 w-6 text-mauve-12" />
    }
    if (link.linkType === "youtube") {
      return <IconBrandYoutube className="h-6 w-6 text-mauve-12" />
    }

    return null
  }

  return (
    <div>
      <ContentContainer>
        <div className="flex items-center justify-between pt-3">
          <BackButton href="/favorite" />

          <div className="flex gap-3">
            {data.linkList
              .filter((link) => {
                return link.linkType !== "others"
              })
              .map((link) => {
                return (
                  <a key={link.url} href={link.url}>
                    {displayLinkIconList(link)}
                  </a>
                )
              })}
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
          <EditButton label="プロフィールを編集" />
        </div>
      </ContentContainer>
    </div>
  )
}
