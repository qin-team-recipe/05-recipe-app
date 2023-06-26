"use client"

import React, { FC } from "react"
import { useSearchParams } from "next/navigation"

import { TwoTab } from "@/app/(app)/_component/twoTab"
import { removeLastEqualSign, twoTabLinkList } from "@/app/(app)/search/_lib"

const SearchRecipePage: FC = () => {
  const searchParams = useSearchParams()

  const convertedSearchParams = removeLastEqualSign(String(searchParams))

  const linkList = twoTabLinkList({ queryParams: searchParams })

  return (
    <div>
      <TwoTab linkList={linkList}>
        <h3>{`パラメータ : ${convertedSearchParams}`}</h3>
      </TwoTab>
    </div>
  )
}

export default SearchRecipePage