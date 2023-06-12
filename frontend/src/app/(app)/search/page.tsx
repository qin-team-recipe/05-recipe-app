import React from "react"

import { ChefList, HotChef, HotRecipe } from "@/app/(app)/search/_component"

export const metadata = {
  title: "シェフやレシピを検索",
}

export default function SearchPage() {
  return (
    <div className="space-y-12">
      <section>
        <HotChef />
      </section>

      <section>
        <HotRecipe />
      </section>

      <section>
        <ChefList />
      </section>
    </div>
  )
}
