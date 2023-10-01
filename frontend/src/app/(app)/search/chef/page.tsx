import React, { FC } from "react"

import { Tab } from "@/app/(app)/_component/tab"
import { tabLinkList } from "@/app/(app)/search/_lib"

type SearchChefPageProps = {
  searchParams: {
    q?: string
  }
}

const SearchChefPage: FC<SearchChefPageProps> = (props) => {
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

export default SearchChefPage
