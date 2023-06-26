import { Link } from "@/app/(app)/_component/twoTab"

/** @package */
export const twoTabLinkList = (paramsId: string): Link[] => {
  return [
    {
      href: `/recipe/${paramsId}`,
      tabLabel: "作り方",
    },
    {
      href: `/recipe/${paramsId}/recipe-item`,
      tabLabel: "材料",
    },
  ]
}
