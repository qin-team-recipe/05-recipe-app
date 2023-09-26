import React, { FC } from "react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { Recipe } from "@/app/(app)/_component/header"
import { RecipeCard } from "@/app/(app)/_component/recipeCard"
import { Tab } from "@/app/(app)/_component/tab"
import { tabLinkList } from "@/app/(app)/chef/[chefId]/_lib"

type ChefPageProps = {
  params: {
    chefId: string
  }
}

const ChefPage: FC<ChefPageProps> = async (props) => {
  const { params } = props
  const response = await fetch(
    `http://localhost:3000/chef/${params.chefId}/api/recipes`,
    {
      cache: "no-store",
    },
  )
  const json: Recipe[] = await response.json()
  const recipeCards = json.map((recipe) => {
    return (
      <RecipeCard
        summary={recipe.user}
        title={recipe.name}
        key={recipe.id}
        favoriteCount={recipe.favoriteCount}
        img={recipe.img}
        recipeId={recipe.id}
      />
    )
  })

  const linkList = tabLinkList(params.chefId)

  return (
    <div className="py-7">
      <Tab linkList={linkList}>
        <ContentContainer>
          <div className="grid grid-cols-2 gap-2 pt-5">{recipeCards}</div>
        </ContentContainer>
      </Tab>
    </div>
  )
}

export default ChefPage
