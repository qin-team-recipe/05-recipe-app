import React, { FC } from "react"

/** @package */
export const SearchHeader: FC = () => {
  return (
    <div className="w-full">
      <input
        type="text"
        name="シェフやレシピを検索"
        placeholder="シェフやレシピを検索"
        className="border-slate-solid w-full rounded-md border"
      />
    </div>
  )
}
