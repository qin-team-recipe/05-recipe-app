/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from "@/app/(app)/_component/tab"

/** @package */
export const tabLinkList = (paramsId: string): Link[] => {
  return [
    {
      // @ts-ignore
      href: `/chef/${paramsId}`,
      tabLabel: "レシピ",
    },
    {
      // @ts-ignore
      href: `/chef/${paramsId}/link`,
      tabLabel: "リンク",
    },
  ]
}
