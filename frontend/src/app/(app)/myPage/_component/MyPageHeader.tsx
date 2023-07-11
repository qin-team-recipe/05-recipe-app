"use client"

import React from "react"

import { BackButton } from "@/app/(app)/_component/backButton"
import { PageHeader } from "@/app/(app)/_component/header"

/** @package */
export const MyPageHeader = () => {
  return (
    <PageHeader
      title="マイページ"
      titleAlign="left"
      leftSectionChildren={<BackButton href="/favorite" />}
    />
  )
}
