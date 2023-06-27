import React from "react"

import { render } from "@testing-library/react"

import { SectionHeader } from "@/app/(app)/_component/header/SectionHeader"
import { SubButtonLink } from "@/app/(app)/_component/header/SectionHeader.types"

describe("セクションヘッダーが正しくレンダリングされている", () => {
  test("propsで受け取ったlabelが正しく表示されている", () => {
    const { getByText } = render(<SectionHeader label="注目のシェフ" />)
    expect(getByText("注目のシェフ")).toBeInTheDocument()
  })
  // TODO: ページ遷移のテスト
  // test("「もっと見る」をクリックするとpropsで受け取ったhrefのページに遷移する", () => {})
  describe("propsで受け取ったsubButtonLinkによってsubButtonLink.labelのボタンの表示・非表示が正しく切り替わっている", () => {
    test("subButtonLink受け取ったときはsubButtonLinkのlabelのボタンが表示される", () => {
      const subButtonLink = {
        href: "/favorite",
        label: "もっと見る",
      } as const satisfies SubButtonLink

      const { getByText } = render(
        <SectionHeader label="注目のシェフ" subButtonLink={subButtonLink} />,
      )
      expect(getByText("もっと見る")).toBeInTheDocument()
    })
    test("subButtonLinkを受け取らなかったときはsubButtonLink.labelのボタンが表示されない", () => {
      const { queryByText } = render(<SectionHeader label="注目のシェフ" />)
      expect(queryByText("もっと見る")).toBeNull()
    })
  })
})
