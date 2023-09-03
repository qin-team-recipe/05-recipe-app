import React, { FC } from "react"

import { TRecipe } from "@/type"
import { IconTrash } from "@tabler/icons-react"

import { SContentContainer } from "@/app/(app)/_component/container"

type DraftListProps = {
  draftList: TRecipe[]
}

/** @package */
export const DraftList: FC<DraftListProps> = (props) => {
  const { draftList } = props

  return (
    <ul className="background-white">
      {draftList.map((draft) => {
        return (
          <li
            key={draft.id}
            className={`
            flex justify-between border-b border-mauve-8 py-2 
            ${SContentContainer({
              isPaddingLeft: true,
              isPaddingRight: true,
            })}
            `}
          >
            <div>
              <p>{draft.title}</p>
              <p className="text-[10px] text-mauve-10">
                {/* TODO: createdAtはAPIから帰ってきたstringを◯◯◯◯年◯◯月◯◯日に変換する処理を追加する */}
                作成日時 <time>{draft.createdAt}</time>
              </p>
            </div>

            <button>
              <IconTrash className="h-6 w-6 text-mauve-11" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
