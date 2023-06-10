import React from "react"

export const RecipeCard = () => {
  return (
    <div className="text-mauve-normal w-36">
      <div className="bg-tomato-ui aspect-square w-full rounded-xl"></div>
      <div className="p-1">
        <div className="text-sm font-bold line-clamp-2">
          メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章メイン文章
        </div>
        <div className=" truncate text-xs">
          補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章補足文章
        </div>
      </div>
    </div>
  )
}
