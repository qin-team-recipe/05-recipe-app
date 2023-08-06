import React from "react"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Link, Tab } from "@/app/(app)/_component/tab"

describe("Tabコンポーネントが正しくレンダリングされている", () => {
  const linkList: Link[] = [
    {
      href: "/chef/1",
      tabLabel: "レシピ",
    },
    {
      href: "/chef/1/link",
      tabLabel: "リンク",
    },
  ]
  describe("propsで受け取ったlinkListのtabLabelが正しく表示されている", () => {
    test("tabLabelで受け取った「レシピ」と「リンク」がタブとして表示されている", () => {
      render(
        <Tab linkList={linkList}>
          <div>レシピ一覧</div>
        </Tab>,
      )

      expect(screen.getByText("レシピ")).toBeInTheDocument()
      expect(screen.getByText("リンク")).toBeInTheDocument()
    })
    test("childrenで受け取った「レシピ一覧」要素が表示されている", () => {
      render(
        <Tab linkList={linkList}>
          <div>レシピ一覧</div>
        </Tab>,
      )

      expect(screen.getByText("レシピ一覧")).toBeInTheDocument()
    })
  })
  describe("childrenで受け取ったページの要素が正しく表示されている", () => {
    test("「レシピ一覧」ページが表示されている", () => {
      render(
        <Tab linkList={linkList}>
          <div>レシピ一覧</div>
        </Tab>,
      )

      expect(screen.getByText("レシピ一覧")).toBeInTheDocument()
    })
  })
  describe("タブをクリックしたらページが切り替わる", () => {
    test(`
    「レシピ」タブが有効な状態で「リンク」タブをクリックしたら「/chef/1」から「chef/1/link」に遷移し、
    「レシピ一覧」ページからリンク一覧のページに切り替わる`, () => {
      render(
        <Tab linkList={linkList}>
          <div>レシピ一覧</div>
        </Tab>,
      )

      expect(screen.getByText("レシピ一覧")).toBeInTheDocument()

      userEvent.click(screen.getByText("リンク"))

      const pathname = location.pathname

      expect(pathname).toEqual(linkList[1].href)
    })
    test(`
    「リンク」タブが有効な状態で「レシピ」タブをクリックしたら「/chef/1/link」から「chef/1」に遷移し、
    「リンク一覧」ページからレシピ一覧のページに切り替わる`, () => {
      render(
        <Tab linkList={linkList}>
          <div>リンク一覧</div>
        </Tab>,
      )

      expect(screen.getByText("リンク一覧")).toBeInTheDocument()
      userEvent.click(screen.getByText("レシピ"))

      const pathname = location.pathname

      expect(pathname).toEqual(linkList[0].href)
    })
  })
})
