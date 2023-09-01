import React from "react"

import {
  DraftList,
  DraftPageHeader,
} from "@/app/(app)/myRecipe/draft/_component"

const DraftPage = () => {
  return (
    <div>
      <DraftPageHeader />
      <DraftList />
    </div>
  )
}

export default DraftPage
