/** @package */
export type Common = {
  img: string
  introduction: string
  name: string
}

/** @package */
export type Chef = {
  follower: number
  recipeCount: number
} & Common

/** @package */
export type Recipe = {
  favoriteCount: number
  user: string
  userImg: string
} & Common
