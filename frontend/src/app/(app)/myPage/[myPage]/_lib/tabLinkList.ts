import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (paramsId: string): Link[] => {
  return [
    {
      href: `/myPage/${paramsId}`,
      tabLabel: "新着レシピ",
    },
    {
      href: `/myPage/${paramsId}/popular`,
      tabLabel: "人気レシピ",
    },
  ]
}
