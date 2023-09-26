import { NextResponse } from "next/server"

import { getRandomInt } from "@/app/_lib"
import { type Recipe } from "@/app/(app)/_component/header"

export const GET = async (_: Request) => {
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
  // 同じシェフの名前を使用するためのNumber作成
  const chefNameNum = getRandomInt(5)
  const authId = 1

  const recipes: Omit<Recipe, "introduction" | "userImg">[] = Array.from({
    length: 20,
  }).map((_, i) => {
    const randomNum = getRandomInt(5)
    return {
      id: i,
      // mapで回している半分の数authorIdをchefIdにして、もう半分を別のシェフのidとして作成するロジック
      authorId: i % 2 === 0 ? `${authId}` : "different-chef-id",
      favoriteCount: getRandomInt(1000),
      img: `/recipe-images/recipe-${getRandomInt(randomNum) + 1}.jpg`,
      name: `${recipeNames[randomNum]}${i}`,
      user: `${chefNames[chefNameNum]}`,
    }
  })

  // chefIdとauthorIdが一致するものだけにfilter
  const filterRecipes = recipes.filter((recipe) => {
    return recipe.authorId === `${authId}`
  })

  const orderRecipes = filterRecipes.sort((a, b) => {
    return a.favoriteCount < b.favoriteCount ? 1 : -1
  })

  return NextResponse.json(orderRecipes)
}
