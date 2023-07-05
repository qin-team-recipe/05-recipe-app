"use client"

import React from "react"
import Link from "next/link"

import { IconMenu, IconUserCircle } from "@tabler/icons-react"

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
      rightSectionChildren={
        <Link href="/myPage">
          <IconUserCircle className="h-6 w-6 text-mauve-12" />
        </Link>
      }
    />
  )
}
