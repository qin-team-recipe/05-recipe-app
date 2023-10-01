import { NextRequest, NextResponse } from "next/server"

import { getRandomInt } from "@/app/_lib"
import { Recipe } from "@/app/(app)/_component/header"

export const GET = async (req: NextRequest) => {
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
  const query: string | null = req.nextUrl.searchParams.get("q")
  const recipes: Omit<Recipe, "introduction" | "userImg">[] = Array.from({
    length: 20,
  }).map((_, i) => {
    const randomNum = getRandomInt(5)

    return {
      id: i,
      authorId: String(i),
      createdAt: `2023/09/${i}`,
      favoriteCount: getRandomInt(1000),
      img: `/recipe-images/recipe-${getRandomInt(randomNum) + 1}.jpg`,
      name:
        i % 2 === 0 ? (query ? query : "") : `${recipeNames[randomNum]}${i}`,
      user: `${chefNames[randomNum]}`,
    }
  })

  const filterRecipes = recipes.filter((recipe) => {
    return recipe.name.split("").some((letter) => {
      return query?.includes(letter)
    })
  })

  return NextResponse.json(filterRecipes)
}
