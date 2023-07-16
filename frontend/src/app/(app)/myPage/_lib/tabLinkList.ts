import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (): Link[] => {
  return [
    {
      href: `/myPage`,
      tabLabel: "新着レシピ",
    },
    {
      href: `/myPage/popular`,
      tabLabel: "人気レシピ",
    },
  ]
}
