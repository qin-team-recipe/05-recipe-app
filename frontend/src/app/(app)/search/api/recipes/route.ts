import { NextResponse } from "next/server"

import { getRandomInt } from "@/app/_lib"
import { type Recipe } from "@/app/(app)/_component/header"

export const GET = async () => {
  const recipeNames: string[] = [
    "トマトとルッコラのマルゲリータピザに合うホワイトソースグラタン",
    "グラタン",
    "山田の特製マルゲリータ",
    "カレーライス",
    "パエリア",
  ]
  const chefNames: string[] = [
    "山田シェフ",
    "田中シェフ",
    "しまぶー",
    "花子",
    "一郎",
  ]

  const hotRecipes: Omit<Recipe, "introduction" | "userImg">[] = Array.from({
    length: 10,
  }).map((_, i) => {
    const randomNum = getRandomInt(5)
    return {
      id: i,
      favoriteCount: getRandomInt(1000),
      hasHotRecipe: true,
      img: `/recipe-images/recipe-${getRandomInt(randomNum) + 1}.jpg`,
      name: `${recipeNames[randomNum]}${i}`,
      user: `${chefNames[randomNum]}`,
    }
  })

  return NextResponse.json(hotRecipes)
}
