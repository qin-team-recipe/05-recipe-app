"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { IconArrowLeft } from "@tabler/icons-react"

import { PageHeader } from "@/app/(app)/_component/header"

/** @package */
export const LatestRecipesPageHeader = () => {
  const router = useRouter()

  return (
    <PageHeader
      title="新着レシピ"
      titleAlign="left"
      leftSectionChildren={
        <button
          onClick={() => {
            return router.push("/favorite")
          }}
        >
          <IconArrowLeft className="h-6 w-6 text-mauve-12" />
        </button>
      }
    />
  )
}
