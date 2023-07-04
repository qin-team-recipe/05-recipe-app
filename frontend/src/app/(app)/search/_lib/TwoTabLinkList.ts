import { ReadonlyURLSearchParams } from "next/navigation"

import { Link } from "@/app/(app)/_component/twoTab"

type TwoTabLinkListArgs = {
  queryParams?: ReadonlyURLSearchParams
}

/** @package */
export const twoTabLinkList = (args: TwoTabLinkListArgs): Link[] => {
  const { queryParams } = args

  const q = queryParams ? `/?q=${queryParams}` : ""

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
