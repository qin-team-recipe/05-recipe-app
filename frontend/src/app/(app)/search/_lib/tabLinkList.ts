import { ReadonlyURLSearchParams } from "next/navigation"

import { Link } from "@/app/(app)/_component/tab"

type TabLinkListArgs = {
  queryParams?: ReadonlyURLSearchParams
}

/** @package */
export const tabLinkList = (args: TabLinkListArgs): Link[] => {
  const { queryParams } = args

  const q = queryParams ? `?${queryParams}` : ""

  return [
    {
      href: `/search/recipe${q}`,
      tabLabel: "レシピ",
    },
    {
      href: `/search/chef${q}`,
      tabLabel: "シェフ",
    },
  ]
}
