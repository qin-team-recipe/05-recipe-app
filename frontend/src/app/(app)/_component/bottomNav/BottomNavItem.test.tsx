import React from "react"
import { Route } from "next"

import { render } from "@testing-library/react"

import { BottomNavItem, NavLabel } from "./BottomNavItem"

describe("BottomNavItemコンポーネントが正しくレンダリングされている", () => {
  describe("propsで受け取ったnavLabelが正しく表示されている", () => {
    const navLabelList: NavLabel[] = ["検索", "お気に入り", "お買い物"]
    const hrefList: Route<string>[] = ["/search", "/favorite", "/shopping"]

    test("「検索」と表示されている", () => {
      const { getByText } = render(<BottomNavItem href={hrefList[0]} navLabel={navLabelList[0]} />)

      expect(getByText(navLabelList[0])).toBeInTheDocument()
    })
    test("「お気に入り」と表示されている", () => {
      const { getByText } = render(<BottomNavItem href={hrefList[1]} navLabel={navLabelList[1]} />)

      expect(getByText(navLabelList[1])).toBeInTheDocument()
    })
    test("「お買い物」と表示されている", () => {
      const { getByText } = render(<BottomNavItem href={hrefList[2]} navLabel={navLabelList[2]} />)

      expect(getByText(navLabelList[2])).toBeInTheDocument()
    })
  })
})
