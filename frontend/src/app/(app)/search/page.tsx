import React from "react"

import { ChefList, HotChefList, HotRecipeList } from "@/app/(app)/search/_component"

export const metadata = {
  title: "シェフやレシピを検索",
}

export default function SearchPage() {
  return (
    <div className="space-y-12">
      <section>
        <HotChefList />
      </section>

      <section>
        <HotRecipeList />
      </section>

      <section>
        <ChefList />
      </section>
    </div>
  )
}
