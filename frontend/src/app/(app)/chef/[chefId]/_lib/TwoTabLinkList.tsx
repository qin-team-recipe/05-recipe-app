import { Link } from "@/app/(app)/_component/twoTab"

/** @package */
export const twoTabLinkList = (paramsId: string): Link[] => {
  return [
    {
      href: `/chef/${paramsId}`,
      tabLabel: "レシピ",
    },
    {
      href: `/chef/${paramsId}/link`,
      tabLabel: "リンク",
    },
  ]
}
