"use client"

import React from "react"

import { IconMenu, IconUserCircle } from "@tabler/icons-react"

import { PageHeader } from "@/app/(app)/_component/header"

/** @package */
export const SettingsPageHeader = () => {
  return (
    <PageHeader
      title="設定"
      titleAlign="left"
      leftSectionChildren={
        <button>
          <IconMenu className="h-6 w-6 text-mauve-12" />
        </button>
      }
      rightSectionChildren={
        <div className="flex">
          <button>
            <IconUserCircle className="h-6 w-6 text-mauve-12" />
          </button>
        </div>
      }
    />
  )
}
