import { NextResponse } from "next/server"

import { getRandomInt } from "@/app/_lib"
import { type Recipe } from "@/app/(app)/_component/header"

export const GET = async () => {
  const recipeNames: string[] = [
    "最新のトマトとルッコラのマルゲリータピザに合うホワイトソースグラタン",
    "最新のグラタン",
    "最新の山田の特製マルゲリータ",
    "最新のカレーライス",
    "最新のパエリア",
  ]
  const chefNames: string[] = [
    "最新の山田シェフ",
    "最新の田中シェフ",
    "最新のしまぶー",
    "最新の花子",
    "最新の一郎",
  ]

  const latestRecipes: Omit<Recipe, "introduction" | "userImg">[] = Array.from({
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

  return NextResponse.json(latestRecipes)
}
