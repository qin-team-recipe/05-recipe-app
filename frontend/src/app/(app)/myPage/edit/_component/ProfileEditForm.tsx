"use client"

import React, { FC } from "react"
import { useRouter } from "next/navigation"

import { UpdateButton } from "@/app/(app)/_component/button"
import {
  InputCommon,
  TextAreaCommon,
} from "@/app/(app)/_component/formElements"
import { LinkList } from "@/app/(app)/myPage/edit/_component/LinkList"

/** @package*/
export const ProfileEditForm: FC = () => {
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push("/myPage")
  }
  return (
    <form
      className="flex h-full  w-full flex-col gap-8 pt-5"
      onSubmit={handleSubmit}
    >
      <InputCommon
        name="nickname"
        title="ニックネーム"
        type="text"
        isRequired
      />
      <InputCommon
        placeholder="画像を選択"
        title="プロフィール画像"
        type="image"
        name="profileImage"
      />
      <TextAreaCommon name="introduntion" title="自己紹介" />
      <LinkList />

      <div className="flex items-center justify-center gap-4 px-4">
        <UpdateButton isSave>登録する</UpdateButton>
        <UpdateButton>キャンセル</UpdateButton>
      </div>
    </form>
  )
}
