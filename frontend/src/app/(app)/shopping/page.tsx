import React from "react"

import { IconDotsCircleHorizontal, IconPlus } from "@tabler/icons-react"

import {
  ShoppingItem,
  ShoppingListDDMenu,
  ShoppingPageHeader,
} from "@/app/(app)/shopping/_component"

export const metadata = {
  title: "お気に入り",
}

export default function FavoritePage() {
  return (
    <div>
      <ShoppingPageHeader />
      <div className="bg-mauve-8 py-4">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div className="text-lg font-bold line-clamp-1">じぶんメモ</div>
          <div className="flex items-center gap-4">
            <button>
              <IconPlus className="h-6 w-6 cursor-pointer text-mauve-12" />
            </button>
            <ShoppingListDDMenu>
              <IconDotsCircleHorizontal className="h-6 w-6 cursor-pointer text-mauve-12" />
            </ShoppingListDDMenu>
          </div>
        </div>
        <form>
          <ShoppingItem isCheckedInitial key="id_1">
            キャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツ
          </ShoppingItem>
          <ShoppingItem isCheckedInitial={false} key="id_2">
            キャベツ
          </ShoppingItem>
        </form>
      </div>
      <div className="bg-mauve-8 py-4">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div className="text-lg font-bold line-clamp-1">
            長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ
          </div>
          <div className="flex items-center gap-4">
            <button>
              <IconPlus className="h-6 w-6 cursor-pointer text-mauve-12" />
            </button>
            <ShoppingListDDMenu>
              <IconDotsCircleHorizontal className="h-6 w-6 cursor-pointer text-mauve-12" />
            </ShoppingListDDMenu>
          </div>
        </div>
        <form>
          <ShoppingItem isCheckedInitial key="id_1">
            キャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツキャベツ
          </ShoppingItem>
          <ShoppingItem isCheckedInitial={false} key="id_2">
            キャベツ
          </ShoppingItem>
        </form>
      </div>
    </div>
  )
}
