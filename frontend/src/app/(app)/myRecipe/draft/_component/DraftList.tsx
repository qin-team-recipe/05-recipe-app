import React, { FC } from "react"

import { TRecipe } from "@/type"
import { IconTrash } from "@tabler/icons-react"

import { sContentContainer } from "@/app/(app)/_component/container"
import { DraftAlertDialog } from "@/app/(app)/myRecipe/draft/_component/DraftAlertDialog"

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
            flex items-center justify-between gap-2 border-b border-mauve-8 py-2 
            ${sContentContainer({
              isPaddingLeft: true,
              isPaddingRight: true,
            })}
            `}
          >
            <div className="flex flex-col gap-1">
              <p className="line-clamp-1">{draft.title}</p>
              <p className="text-[10px] text-mauve-10">
                {/* TODO: createdAtはAPIから帰ってきたstringを◯◯◯◯年◯◯月◯◯日に変換する処理を追加する */}
                作成日時 <time>{draft.createdAt}</time>
              </p>
            </div>

            <DraftAlertDialog deleteDraftTitle={draft.title}>
              <IconTrash className="h-6 w-6 min-w-[24px] text-mauve-11" />
            </DraftAlertDialog>
          </li>
        )
      })}
    </ul>
  )
}
