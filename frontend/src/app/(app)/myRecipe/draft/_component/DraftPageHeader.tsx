"use client"

import React, { FC } from "react"
import { useRouter } from "next/navigation"

import { IconArrowLeft } from "@tabler/icons-react"

import { PageHeader } from "@/app/(app)/_component/header"

/** @package */
export const DraftPageHeader: FC = () => {
  const router = useRouter()

  return (
    <PageHeader
      title="下書き"
      titleAlign="left"
      isBgGray
      isTitleGray
      leftSectionChildren={
        <button
          onClick={() => {
            return router.back()
          }}
        >
          <IconArrowLeft className="h-6 w-6 text-mauve-12" />
        </button>
      }
    />
  )
}
