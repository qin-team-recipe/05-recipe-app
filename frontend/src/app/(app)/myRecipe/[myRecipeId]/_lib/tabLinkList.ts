import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (paramsId: string): Link[] => {
  return [
    {
      href: `/myRecipe/${paramsId}`,
      tabLabel: "作り方",
    },
    {
      href: `/myRecipe/${paramsId}/recipeItem`,
      tabLabel: "材料",
    },
  ]
}
