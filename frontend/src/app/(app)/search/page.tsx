import React from "react"

import { HotChef, HotRecipe } from "@/app/(app)/search/_component"

export const metadata = {
  title: "シェフやレシピを検索",
}

export default function SearchPage() {
  const chefCards = Array.from({ length: 50 }).map((_, i) => {
    return <p key={i}>シェフカード</p>
  })

  return (
    <div className="space-y-12">
      <section>
        <HotChef />
      </section>

      <section>
        <HotRecipe />
      </section>

      <section>
        <h3>シェフ</h3>
        {chefCards}
      </section>
    </div>
  )
}
