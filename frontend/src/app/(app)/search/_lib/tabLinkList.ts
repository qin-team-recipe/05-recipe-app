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
      href: `/search/recipe${q}`,
      tabLabel: "レシピ",
    },
    {
      href: `/search/chef${q}`,
      tabLabel: "シェフ",
    },
  ]
}
