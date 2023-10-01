/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (paramsId: string): Link[] => {
  return [
    {
      // @ts-ignore
      href: `/myRecipe/${paramsId}`,
      tabLabel: "作り方",
    },
    {
      // @ts-ignore
      href: `/myRecipe/${paramsId}/recipeItem`,
      tabLabel: "材料",
    },
  ]
}
