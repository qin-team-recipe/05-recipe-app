import React from "react"
import { Route } from "next"

import { render, screen } from "@testing-library/react"

import {
  BottomNavItem,
  NavLabel,
} from "@/app/(app)/_component/bottomNav/BottomNavItem"

describe("BottomNavItemコンポーネントが正しくレンダリングされている", () => {
  describe("propsで受け取ったnavLabelが正しく表示されている", () => {
    const navLabelList: NavLabel[] = [
      "一流レシピ",
      "お気に入り",
      "買い物リスト",
    ]
    const hrefList: (Route<string> | URL)[] = [
      "/search",
      "/favorite",
      "/shopping",
    ]

    test("「一流レシピ」と表示されている", () => {
      render(<BottomNavItem href={hrefList[0]} navLabel={navLabelList[0]} />)

      expect(screen.getByText(navLabelList[0])).toBeInTheDocument()
    })
    test("「お気に入り」と表示されている", () => {
      render(<BottomNavItem href={hrefList[1]} navLabel={navLabelList[1]} />)

      expect(screen.getByText(navLabelList[1])).toBeInTheDocument()
    })
    test("「買い物リスト」と表示されている", () => {
      render(<BottomNavItem href={hrefList[2]} navLabel={navLabelList[2]} />)

      expect(screen.getByText(navLabelList[2])).toBeInTheDocument()
    })
  })
})
