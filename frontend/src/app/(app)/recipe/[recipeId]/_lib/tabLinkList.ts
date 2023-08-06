import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (paramsId: string): Link[] => {
  return [
    {
      href: `/recipe/${paramsId}`,
      tabLabel: "作り方",
    },
    {
      href: `/recipe/${paramsId}/recipeItem`,
      tabLabel: "材料",
    },
    {
      href: `/recipe/${paramsId}/link`,
      tabLabel: "リンク",
    },
  ]
}
