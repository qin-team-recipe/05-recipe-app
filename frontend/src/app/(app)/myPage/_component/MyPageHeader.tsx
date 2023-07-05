"use client"

import React from "react"
import Link from "next/link"

import { IconArrowLeft } from "@tabler/icons-react"

import { PageHeader } from "@/app/(app)/_component/header"

/** @package */
export const MyPageHeader = () => {
  return (
    <PageHeader
      title="マイページ"
      titleAlign="left"
      leftSectionChildren={
        <Link href="/favorite">
          <IconArrowLeft className="h-6 w-6 text-mauve-12" />
        </Link>
      }
    />
  )
}
