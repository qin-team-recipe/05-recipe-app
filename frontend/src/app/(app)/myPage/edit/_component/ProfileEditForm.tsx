"use client"

import React, { FC } from "react"
import { useRouter } from "next/navigation"

import { valibotResolver } from "@hookform/resolvers/valibot"
import { FormProvider, useForm } from "react-hook-form"

import { CancelButton, SubmitButton } from "@/app/(app)/_component/button"
import { ImageInputField, TextField } from "@/app/(app)/_component/formParts"
import {
  ProfileEditFormSchema,
  TProfileEditFormSchema,
} from "@/app/(app)/myPage/_lib"
import { LinkList } from "@/app/(app)/myPage/edit/_component/LinkList"

/** @package */
export const ProfileEditForm: FC = () => {
  const router = useRouter()

  const methods = useForm<TProfileEditFormSchema>({
    defaultValues: {
      introduction: "自己紹介",
      linkList: [
        { url: "https://twitter.com/home" },
        { url: "https://www.instagram.com" },
      ],
      nickname: "ニックネーム",
    },
    mode: "onBlur",
    resolver: valibotResolver(ProfileEditFormSchema),
  })

  const handleSubmit = (data: TProfileEditFormSchema) => {
    // eslint-disable-next-line no-console
    console.log(data)

    router.push("/myPage")
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-full  w-full flex-col gap-8 pt-5"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <TextField<TProfileEditFormSchema>
          fieldName="nickname"
          label="ニックネーム"
        />
        <ImageInputField<TProfileEditFormSchema>
          fieldName="profileImage"
          label="プロフィール画像"
        />
        <TextField<TProfileEditFormSchema>
          fieldName="introduction"
          label="自己紹介（任意）"
          isMultiline
        />
        {/* TODO: LinkListもリファクタしてジェネリクスで型を渡すようにしたい */}
        <LinkList label="リンク（任意）" />

        <div className="flex items-center justify-center gap-4 px-4">
          {/* NODE: 保存する・登録するはフォームプロバイダで管理するのでtype=submit */}
          <SubmitButton
            label="保存する"
            disabled={
              !methods.formState.isValid || methods.formState.isSubmitting
            }
          />
          {/* NOTE: キャンセルはフォームプロバイダで管理しないのでonClickで管理 */}
          <CancelButton
            label="キャンセル"
            onClick={() => {
              return router.push("/myPage")
            }}
          />
        </div>
      </form>
    </FormProvider>
  )
}
