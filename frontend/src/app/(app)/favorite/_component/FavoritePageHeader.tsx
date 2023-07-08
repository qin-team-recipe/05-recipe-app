"use client"

import React from "react"

import { IconMenu } from "@tabler/icons-react"

import { PageHeader } from "@/app/(app)/_component/header"

/** @package */
export const FavoritePageHeader = () => {
  return (
    <PageHeader
      title="お気に入り"
      titleAlign="center"
      leftSectionChildren={
        <button>
          <IconMenu className="h-6 w-6 text-mauve-12" />
        </button>
      }
    />
  )
}
