import React from "react"

import { FavoritePageHeader } from "@/app/(app)/favorite/_component"

export const metadata = {
  title: "お気に入り",
}

export default function FavoritePage() {
  return (
    <div>
      <FavoritePageHeader />
      お気に入りページ
    </div>
  )
}
