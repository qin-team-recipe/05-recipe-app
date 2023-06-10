import React from "react"

import { render } from "@testing-library/react"

import { SectionHeader } from "@/app/(app)/_component/header/SectionHeader"

describe("セクションヘッダーが正しくレンダリングされている", () => {
  test("propsで受け取ったtitleが正しく表示されている", () => {
    const { getByText } = render(<SectionHeader title="注目のシェフ" href="/favorite" />)
    expect(getByText("注目のシェフ")).toBeInTheDocument()
  })
  // TODO: ページ遷移のテスト
  // test("「もっと見る」をクリックするとpropsで受け取ったhrefのページに遷移する", () => {})
  describe("propsで受け取ったisMoreの値によって「もっと見る」ボタンの表示が正しく切り替わっている", () => {
    test("isMoreがtrueのときは「もっと見る」ボタンが表示される", () => {
      const { getByText } = render(<SectionHeader title="注目のシェフ" href="/favorite" isMore />)
      expect(getByText("もっと見る")).toBeInTheDocument()
    })
    test("isMoreがfalseのときは「もっと見る」ボタンが表示されない", () => {
      const { queryByText } = render(<SectionHeader title="注目のシェフ" href="/favorite" isMore={false} />)
      expect(queryByText("もっと見る")).toBeNull()
    })
    test("isMoreが指定されていないときはデフォルト値のfalseのため「もっと見る」ボタンが表示されない", () => {
      const { queryByText } = render(<SectionHeader title="注目のシェフ" href="/favorite" />)
      expect(queryByText("もっと見る")).toBeNull()
    })
  })
})
