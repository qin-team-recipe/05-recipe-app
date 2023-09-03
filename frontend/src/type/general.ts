// TODO: 各コンポーネントで使用しているRecipeやChef等の型をこのファイルの型を使用するように修正する必要がある
/** @package */
export type TImg = {
  key: string
  name: string
  url: string
}

/** @package */
export type TImgList = TImg[]

/** @package */
export type TLink = {
  id: string
  accountId?: string
  linkType: "twitter" | "instagram" | "others"
  siteName?: string
  snsFollower?: number
  url: string
}

/** @package */
export type TLinkList = TLink[]

/** @package */
export type TChef = {
  id: string
  follower: number
  img?: TImg
  introduction: string
  isFollow: boolean
  linkList: TLink[]
  name: string
}

/** @package */
export type TChefList = TChef[]

/** @package */
/** 作り方 */
export type TInstruction = {
  description: string
  step: number
}

/** @package */
export type TInstructionList = TInstruction[]

/** @package */
/** 材料 */
export type TRecipeItem = {
  note: string
}

/** @package */
export type TRecipeItemList = TRecipeItem[]

/** @package */
export type TRecipe = {
  id: string
  createdAt: string
  favoriteCount: number
  img: TImg
  instructionList: TInstructionList
  isDraft: boolean
  recipeItemList: TRecipeItemList
  recipeLinkList: TLinkList
  servings: number
  summary: string
  title: string
}

/** @package */
export type TRecipeList = TRecipe[]

/** @package */
export type TUserInfo = {
  likeList: [recipeId: string]
}
