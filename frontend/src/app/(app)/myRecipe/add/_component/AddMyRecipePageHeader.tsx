"use client"

import React from "react"
import Link from "next/link"

import { IconX } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { PageHeader } from "@/app/(app)/_component/header"
import { baseLabel } from "@/app/(app)/_component/label"

const draftButton = tv({
  base: "text-mauve-11 font-bold",
  extend: baseLabel,
})

const addMyRecipePageHeader = tv({
  slots: {
    draftButton: draftButton(),
  },
})

/** @package */
export const AddMyRecipePageHeader = () => {
  const { draftButton } = addMyRecipePageHeader()

  return (
    <PageHeader
      leftSectionChildren={
        <button data-testid="close">
          <IconX className="h-6 w-6 text-mauve-12" />
        </button>
      }
      rightSectionChildren={
        <Link href="/myRecipe/add" className={draftButton()}>
          下書き一覧
        </Link>
      }
    />
  )
}
