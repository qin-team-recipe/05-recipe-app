import { NextResponse } from "next/server"

import { type Recipe } from "@/app/(app)/_component/header"

export const GET = async (
  _: Request,
  { params }: { params: { recipeId: string } },
) => {
  const recipeId = params.recipeId

  // 「1」〜「渡した引数の数字」までのランダムな「number」を生成してreturnする関数（少しリッチな見た目にするため）
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) + 1
  }

  const data: Recipe = {
    favoriteCount: getRandomInt(1000),
    img: `/recipe-images/recipe-${getRandomInt(5)}.jpg`,
    introduction:
      "おいしいおいしいマルゲリータピザ。トマトたっぷり・チーズたっぷり！生地はさくさくもっちもち",
    name: `山田の特製マルゲリータ${recipeId}`,
    user: "山田シェフ",
    userImg: "/chef.jpg",
  }

  return NextResponse.json(data)
}
