"use client"

import React, { FC, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { IconX } from "@tabler/icons-react"
import { tv } from "tailwind-variants"

import { SearchSvg } from "@/app/(app)/_component/icon"
import { removeLastEqualSign } from "@/app/(app)/search/_lib"

const searchHeader = tv({
  slots: {
    searchInput: `
    text-mauve-normal w-full rounded-lg border-0
    bg-mauve-3 px-10 py-1.5 text-sm font-bold leading-6 outline-none
    placeholder:text-mauve-dim
    focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mauve-7
    dark:bg-mauvedark-3 dark:focus-visible:ring-mauvedark-7`,
    searchSvg: `
    stroke-gray-11 font-bold
    group-hover:stroke-tomato-11
    dark:stroke-graydark-11 darkroup-hover:stroke-tomatodark-11`,
  },
})

/** @package */
export const SearchHeader: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const convertedSearchParams = removeLastEqualSign(String(searchParams))

  const [searchKeyword, setSearchKeyword] = useState(convertedSearchParams)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const { searchInput, searchSvg } = searchHeader()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clearTimeout(timer!)

    const newTimer = setTimeout(() => {
      if (searchKeyword) {
        const redirectPathname =
          pathname === ("/search/recipe" || "/search/chef")
            ? pathname
            : "/search/chef"
        const pushToLink = `${redirectPathname}/?q=${event.target.value}`
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        router.push(pushToLink)
        setTimer(null)
      } else if (!event.target.value) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        router.push(pathname)
      }
    }, 1000)

    setTimer(newTimer)
  }

  return (
    <div className="relative flex">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchSvg color={searchSvg()} strokeWidth="2" width={20} height={20} />
      </div>
      <input
        type="text"
        name="シェフやレシピを検索"
        placeholder="シェフやレシピを検索"
        autoComplete="off"
        className={searchInput()}
        value={searchKeyword}
        onChange={handleChange}
      />
      {timer && (
        <div className="absolute inset-y-2.5 right-0 mr-3 h-4 w-4 animate-spin rounded-full border-2 border-l-0 border-mauve-11"></div>
      )}
      {!timer && searchKeyword && (
        <button
          className="absolute inset-y-2 right-0 mr-3"
          onClick={() => {
            setSearchKeyword("")
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            router.push(pathname)
          }}
        >
          <IconX size={18} />
        </button>
      )}
    </div>
  )
}
