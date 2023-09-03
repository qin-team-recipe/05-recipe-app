"use client"

import React, { FC } from "react"
import { useRouter } from "next/navigation"

import { UpdateButton } from "@/app/(app)/_component/button"
import { InputCommon } from "@/app/(app)/_component/formElements"

/** @package*/
export const RegisterForm: FC = () => {
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push("/")
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
        placeholder="ニックネームをご入力ください"
      />
      <div className="flex items-center justify-center gap-4 px-4">
        <UpdateButton isSave>登録する</UpdateButton>
        <UpdateButton>キャンセル</UpdateButton>
      </div>
    </form>
  )
}
