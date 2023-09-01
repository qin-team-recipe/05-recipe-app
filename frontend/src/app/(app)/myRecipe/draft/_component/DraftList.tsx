import React, { FC } from "react"

import { IconTrash } from "@tabler/icons-react"

import { SContentContainer } from "@/app/(app)/_component/container"

/** @package */
export const DraftList: FC = () => {
  // draftItemsを5件表示する
  const draftItems = Array.from({ length: 4 }).map((_, i) => {
    return (
      <li
        key={i}
        className={`
        flex justify-between border-b border-mauve-8 py-2 
        ${SContentContainer({
          isPaddingLeft: true,
          isPaddingRight: true,
        })}
        `}
      >
        <div>
          <p>グラタン</p>
          <p className="text-[10px] text-mauve-10">
            作成日時 <time>2023年4月22日</time>
          </p>
        </div>

        <button>
          <IconTrash className="h-6 w-6 text-mauve-11" />
        </button>
      </li>
    )
  })

  return <ul className="background-white">{draftItems}</ul>
}
