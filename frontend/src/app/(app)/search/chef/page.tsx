"use client"

import React, { FC } from "react"
import { useSearchParams } from "next/navigation"

import { Tab } from "@/app/(app)/_component/tab"
import { removeLastEqualSign, tabLinkList } from "@/app/(app)/search/_lib"

const SearchChefPage: FC = () => {
  const searchParams = useSearchParams()

  const convertedSearchParams = removeLastEqualSign(
    String(searchParams.get("q")),
  )

  const linkList = tabLinkList({ queryParams: searchParams })

  return (
    <div>
      <Tab linkList={linkList}>
        <h3>{`パラメータ : ${convertedSearchParams}`}</h3>
      </Tab>
    </div>
  )
}

export default SearchChefPage
