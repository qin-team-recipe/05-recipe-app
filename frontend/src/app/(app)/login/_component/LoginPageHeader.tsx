"use client"

import React, { FC } from "react"

import { PageHeader } from "@/app/(app)/_component/header"

type Props = {
  page: "favorite" | "shopping"
}
/** @package */
export const LoginPageHeader: FC<Props> = (props) => {
  const { page } = props
  const title = page == "favorite" ? "お気に入り" : "買い物リスト"

  return <PageHeader title={title} titleAlign="center" />
}
