/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from "@/app/(app)/_component/tab"

type TabLinkListArgs = {
  searchParams: {
    q?: string
  }
}

/** @package */
export const tabLinkList = (args: TabLinkListArgs): Link[] => {
  const { searchParams } = args

  const q = searchParams?.q
    ? `/?q=${decodeURIComponent(searchParams?.q ?? "")}`
    : ""

  return [
    {
      // @ts-ignore
      href: `/search/recipe${q}`,
      tabLabel: "レシピ",
    },
    {
      // @ts-ignore
      href: `/search/chef${q}`,
      tabLabel: "シェフ",
    },
  ]
}
