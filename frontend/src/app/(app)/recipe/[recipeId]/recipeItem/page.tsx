import React, { FC } from "react"
import { Metadata, ResolvingMetadata } from "next"

import type { TRecipeItem } from "@/type"
import { IconCopy } from "@tabler/icons-react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader, SubButtonLink } from "@/app/(app)/_component/header"
import { RecipeItem } from "@/app/(app)/_component/recipeItem"
import { Tab } from "@/app/(app)/_component/tab"
import { tabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

export const generateMetadata = async (
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const previousImages = (await parent).openGraph?.images || []
  const parentTitle = (await parent).title + "の材料"

  return {
    openGraph: {
      images: [...previousImages],
    },
    title: parentTitle,
  }
}

type LinkTabPageProps = {
  params: {
    recipeId: string
  }
}

const LinkTabPage: FC<LinkTabPageProps> = async (props) => {
  const { params } = props

  const linkList = tabLinkList(params.recipeId)
  const recipeItemList: TRecipeItem[] = [
    { note: "トマト１個" },
    { note: "チーズ２枚" },
    { note: "オリーブオイル少々" },
  ]
  const recipeItems = recipeItemList.map((recipeItem, i) => {
    return <RecipeItem note={recipeItem.note} key={i} />
  })
  const subButtonLink = {
    href: "/favorite",
    label: "まとめてお買物に追加",
  } as const satisfies SubButtonLink

  return (
    <div className="py-7">
      <Tab linkList={linkList}>
        <div className="my-2 grid grid-cols-1 divide-y divide-mauve-8">
          <ContentContainer>
            <SectionHeader label="２人前" subButtonLink={subButtonLink} />
          </ContentContainer>
          {recipeItems}
        </div>
      </Tab>
      <div className="flex justify-end px-4">
        <button className="flex text-blue-11 active:opacity-95">
          <IconCopy />
          コピーする
        </button>
      </div>
    </div>
  )
}

export default LinkTabPage
