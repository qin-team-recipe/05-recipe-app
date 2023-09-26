// TODO: img, introductionはオプショナルにする必要がある

import { Dates } from "@/type"

/** @package */
export type Common = {
  img: string
  introduction: string
  name: string
}

/** @package */
export type Link = {
  linkType: "twitter" | "instagram" | "youtube" | "others"
  siteName?: string
  url: string
}

/** @package */
export type Chef = {
  chefId: string
  follower: number
  linkList: Link[]
  recipeCount: number
} & Common

/** @package */
export type Recipe = {
  id: number
  authorId: string
  favoriteCount: number
  user: string
  userImg: string
} & Common &
  Dates

/** @package */
export type MyPage = Chef

/** @package */
export type MyRecipe = Recipe & {
  isPublish: boolean
}
