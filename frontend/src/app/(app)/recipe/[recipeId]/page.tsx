import React, { FC } from "react"

import { IconCopy } from "@tabler/icons-react"

import { PageDetailHeader } from "@/app/(app)/_component/header"

export const metadata = {
  title: "レシピ詳細",
}

const ChefPage: FC = () => {
  const recipeData = {
    favoriteCount: 222,
    img: "/pizza.jpg",
    introduction:
      "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
    name: "山田の特製マルゲリータ",
    user: "山田シェフ",
    userImg: "/chef.jpg",
  }

  return (
    <div>
      <PageDetailHeader data={recipeData} pageType="recipe" />
      <div className="flex justify-end px-4">
        <button className="flex text-blue-11 active:opacity-95">
          <IconCopy />
          コピーする
        </button>
      </div>
    </div>
  )
}

export default ChefPage
