import React from "react"

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
        <h3>注目のシェフ</h3>
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
