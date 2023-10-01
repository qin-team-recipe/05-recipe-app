/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (paramsId: string): Link[] => {
  return [
    {
      // @ts-ignore
      href: `/recipe/${paramsId}`,
      tabLabel: "作り方",
    },
    {
      // @ts-ignore
      href: `/recipe/${paramsId}/recipeItem`,
      tabLabel: "材料",
    },
    {
      // @ts-ignore
      href: `/recipe/${paramsId}/link`,
      tabLabel: "リンク",
    },
  ]
}
