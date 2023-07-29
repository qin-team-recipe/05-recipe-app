import React from "react"

import { BiPlus } from "react-icons/bi"

import { LinkListItem } from "@/app/(app)/_component/recipeItem"

const dummyUrl = ["https://twitter.com/home", "https://www.instagram.com/"]

//TODO: fetchしたデータと追加するデータのマージ処理方法を検討
/** @package */
export const LinkList = () => {
  return (
    <div className="border-t border-t-mauve-7">
      <ul>
        {dummyUrl.map((url) => {
          return (
            <li key={url}>
              <LinkListItem preUrl={url} />
            </li>
          )
        })}
      </ul>
      <div className="px-4 pt-2">
        <button
          className="flex items-center gap-1 border-none text-tomato-9 outline-none"
          type="button"
        >
          <BiPlus />
          <span>リンクを追加する</span>
        </button>
      </div>
    </div>
  )
}
