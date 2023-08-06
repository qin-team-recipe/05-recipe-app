"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { IconArrowLeft } from "@tabler/icons-react"

import { PageHeader } from "@/app/(app)/_component/header"

/** @package */
export const TermsPageHeader = () => {
  const router = useRouter()

  return (
    <PageHeader
      title="利用規約"
      titleAlign="left"
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
