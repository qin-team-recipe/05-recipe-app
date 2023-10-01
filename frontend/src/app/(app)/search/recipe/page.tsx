import React, { FC } from "react"

import { Tab } from "@/app/(app)/_component/tab"
import { tabLinkList } from "@/app/(app)/search/_lib"

type SearchRecipePageProps = {
  searchParams: {
    q?: string
  }
}

const SearchRecipePage: FC<SearchRecipePageProps> = (props) => {
  const { searchParams } = props

  const linkList = tabLinkList({ searchParams: searchParams ?? "" })

  return (
    <div>
      <Tab linkList={linkList}>
        <h3>{`パラメータ : ${searchParams.q}`}</h3>
      </Tab>
    </div>
  )
}

export default SearchRecipePage
