import React from "react"

import { HotChef } from "@/app/(app)/search/_component"

export const metadata = {
  title: "シェフやレシピを検索",
}

export default function SearchPage() {
  const chefCards = Array.from({ length: 50 }).map((_, i) => {
    return <p key={i}>シェフカード</p>
  })

  return (
    <div className="space-y-6">
      <section>
        <HotChef />
      </section>

      <section>
        <h3>話題のレシピ</h3>
      </section>

      <section>
        <h3>シェフ</h3>
        {chefCards}
      </section>
    </div>
  )
}
