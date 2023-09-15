import React from "react"

import { getDraft } from "@/mock/api"

import {
  DraftList,
  DraftPageHeader,
} from "@/app/(app)/myRecipe/draft/_component"

const DraftPage = () => {
  const draftList = getDraft()

  return (
    <div>
      <DraftPageHeader />
      <DraftList draftList={draftList} />
    </div>
  )
}

export default DraftPage
