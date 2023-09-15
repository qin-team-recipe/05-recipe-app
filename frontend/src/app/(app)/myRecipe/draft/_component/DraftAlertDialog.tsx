"use client"

import React, { FC, ReactNode, useState } from "react"

import { AlertDialogWrapper } from "@/app/_component"
import { CancelButton, SubmitButton } from "@/app/(app)/_component/button"

type DraftAlertDialogProps = {
  children: ReactNode
  deleteDraftTitle: string
}

/** @package */
export const DraftAlertDialog: FC<DraftAlertDialogProps> = (props) => {
  const { children, deleteDraftTitle } = props

  const [isOpen, setIsOpen] = useState(false)

  const handleClickCancel = () => {
    setIsOpen(false)
  }

  const handleClickDelete = () => {
    /* TODO: 下書きの削除処理 */
    setIsOpen(false)
  }

  return (
    <AlertDialogWrapper
      alertDescription={
        <div className="flex flex-col items-center gap-2">
          <p>この下書きを本当に削除しますか？</p>
          <code className="pre-wrap w-fit max-w-full rounded-md bg-mauve-3 px-4 py-3 text-sm font-bold text-tomato-10">
            {deleteDraftTitle}
          </code>
        </div>
      }
      alertTitle="下書きを削除"
      cancelButton={
        <CancelButton label="キャンセル" onClick={handleClickCancel} />
      }
      okButton={<SubmitButton label="削除する" onClick={handleClickDelete} />}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
    >
      {children}
    </AlertDialogWrapper>
  )
}
