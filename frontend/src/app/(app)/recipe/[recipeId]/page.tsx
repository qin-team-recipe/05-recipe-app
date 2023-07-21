import React, { FC } from "react"

import { IconCopy } from "@tabler/icons-react"

import { Instruction } from "@/app/(app)/_component/instruction"
import { Tab } from "@/app/(app)/_component/tab"
import { RecipePageDetail } from "@/app/(app)/recipe/[recipeId]/_component"
import { tabLinkList } from "@/app/(app)/recipe/[recipeId]/_lib"

export const metadata = {
  title: "レシピ詳細",
}

type RecipePageProps = {
  params: {
    recipeId: string
  }
}

const RecipePage: FC<RecipePageProps> = (props) => {
  const { params } = props

  const demoInstruction = `
  <div>
    <h3>作り方1</h3>
    <p>作り方の説明1</p>
    <ul>
      <li>手順1</li>
      <li>手順2</li>
      <li>手順3</li>
    </ul>
    <div>
      <img
        src="https://plus.unsplash.com/premium_photo-1667862845435-482054e4cabc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1642&q=80"
        alt=""
        width={50}
        height={50}
      />
      <img
        src="https://plus.unsplash.com/premium_photo-1667862845435-482054e4cabc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1642&q=80"
        alt=""
        width={50}
        height={50}
      />
    </div>
  </div>
  `
  const recipeItems = Array.from({ length: 10 }).map((_, i) => {
    return <Instruction key={i} instruction={demoInstruction} step={i + 1} />
  })

  const linkList = tabLinkList(params.recipeId)

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
      <RecipePageDetail data={recipeData} />

      <div className="py-7">
        <Tab linkList={linkList}>
          <div>{recipeItems}</div>
        </Tab>
        <div className="flex justify-end px-4">
          <button className="flex text-blue-11 active:opacity-95">
            <IconCopy />
            コピーする
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipePage
