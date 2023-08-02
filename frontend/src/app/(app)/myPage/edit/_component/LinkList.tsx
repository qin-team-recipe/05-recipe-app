import React, { FC } from "react"

import { BiPlus } from "react-icons/bi"

import { LinkListItem } from "@/app/(app)/_component/recipeItem"

const dummyUrl = ["https://twitter.com/home", "https://www.instagram.com/"]

type LinkListProps = {
  isRequired?: boolean
  title: string
}

//TODO: fetchしたデータと追加するデータのマージ処理方法を検討
/** @package */
export const LinkList: FC<LinkListProps> = (props) => {
  const { isRequired, title } = props
  return (
    <div className="flex flex-col gap-1">
      <label className="px-4 text-base font-bold leading-5">
        {title}
        {isRequired ?? "（任意）"}
      </label>
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
    </div>
  )
}
