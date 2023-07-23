// TODO: img, introductionはオプショナルにする必要がある
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
  favoriteCount: number
  user: string
  userImg: string
} & Common

/** @package */
export type MyPage = Chef
