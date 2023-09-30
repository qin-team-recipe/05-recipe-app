import { NextResponse } from "next/server"

import { getRandomInt } from "@/app/_lib"
import { type Recipe } from "@/app/(app)/_component/header"

export const GET = async () => {
  const recipeNames: string[] = [
    "好きなトマトとルッコラのマルゲリータピザに合うホワイトソースグラタン",
    "好きなグラタン",
    "好きな山田の特製マルゲリータ",
    "好きなカレーライス",
    "好きなパエリア",
  ]
  const chefNames: string[] = [
    "好きな山田シェフ",
    "好きな田中シェフ",
    "好きなしまぶー",
    "好きな花子",
    "好きな一郎",
  ]

  const favoriteRecipes: Omit<Recipe, "introduction" | "userImg">[] =
    Array.from({
      length: 10,
    }).map((_, i) => {
      const randomNum = getRandomInt(5)
      return {
        id: i,
        // 本来はちゃんとしたchefのidを入れる
        authorId: `${i}`,
        favoriteCount: getRandomInt(1000),
        hasHotRecipe: true,
        img: `/recipe-images/recipe-${getRandomInt(randomNum) + 1}.jpg`,
        name: `${recipeNames[randomNum]}${i}`,
        user: `${chefNames[randomNum]}`,
      }
    })

  return NextResponse.json(favoriteRecipes)
}
