import React from "react"

import {
  ShoppingItem,
  ShoppingPageHeader,
} from "@/app/(app)/shopping/_component"

export const metadata = {
  title: "お気に入り",
}

export default function FavoritePage() {
  return (
    <div>
      <ShoppingPageHeader />
      <form>
        <ShoppingItem isCheckedInitial key="id_1">
          キャベツ
        </ShoppingItem>
        <ShoppingItem isCheckedInitial={false} key="id_2">
          キャベツ
        </ShoppingItem>
      </form>
    </div>
  )
}
