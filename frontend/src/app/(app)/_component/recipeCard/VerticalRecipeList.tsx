"use client"

import React from "react"

import { ScrollAreaWrapper } from "@/app/_component"
import { ContentContainer } from "@/app/(app)/_component/container"
import { SectionHeader } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard/RecipeCard"

type VerticalRecipeListProps = {
  label: string
}

/** @package */
export const VerticalRecipeList = (props: VerticalRecipeListProps) => {
  const { label } = props

  const chefCards = Array.from({ length: 20 }).map((_, i) => {
    return (
      <RecipeCard
        summary="補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章"
        title="メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章"
        key={i}
      />
    )
  })

  return (
    <div className="space-y-4">
      <ContentContainer>
        <SectionHeader label={label} />
      </ContentContainer>
      <ContentContainer isPaddingRight={false}>
        <ScrollAreaWrapper orientation="vertical">
          <ContentContainer isPaddingLeft={false} isPaddingRight={true}>
            <div className="grid h-full w-full grid-cols-2 gap-x-3 gap-y-3.5">
              {chefCards}
            </div>
          </ContentContainer>
        </ScrollAreaWrapper>
      </ContentContainer>
    </div>
  )
}
