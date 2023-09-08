"use client"

import React, { FC } from "react"
import { useRouter } from "next/navigation"

import { valibotResolver } from "@hookform/resolvers/valibot"
import { FormProvider, useForm } from "react-hook-form"

import { CancelButton, SubmitButton } from "@/app/(app)/_component/button"
import { TextField } from "@/app/(app)/_component/formParts"
import {
  RegisterFormSchema,
  TRegisterFormSchema,
} from "@/app/(app)/register/_lib"

/** @package*/
export const RegisterForm: FC = () => {
  const router = useRouter()

  const methods = useForm<TRegisterFormSchema>({
    defaultValues: {
      // nickname: "ニックネーム",
    },
    mode: "onBlur",
    resolver: valibotResolver(RegisterFormSchema),
  })

  const handleSubmit = (data: TRegisterFormSchema) => {
    // eslint-disable-next-line no-console
    console.log(data)

    router.push("/")
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-full  w-full flex-col gap-8 pt-5"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <TextField<TRegisterFormSchema>
          fieldName="nickname"
          label="ニックネーム"
          placeholder="ニックネームをご入力ください"
        />
        <div className="flex items-center justify-center gap-4 px-4">
          {/* NODE: 保存する・登録するはフォームプロバイダで管理するのでtype=submit */}
          <SubmitButton
            label="登録する"
            disabled={
              !methods.formState.isValid || methods.formState.isSubmitting
            }
          />
          {/* NOTE: キャンセルはフォームプロバイダで管理しないのでonClickで管理 */}
          <CancelButton
            label="ログアウト"
            onClick={() => {
              return router.push("/")
            }}
          />
        </div>
      </form>
    </FormProvider>
  )
}
