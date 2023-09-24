import { NextResponse } from "next/server"

import { getRandomInt } from "@/app/_lib"
import { type Recipe } from "@/app/(app)/_component/header"

export const GET = async (
  _: Request,
  { params }: { params: { recipeId: string } },
) => {
  const recipeId = params.recipeId
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
