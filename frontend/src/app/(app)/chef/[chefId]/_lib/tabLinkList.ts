import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (paramsId: string): Link[] => {
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
