import React from "react"

import { render, screen } from "@testing-library/react"

import { Step } from "@/app/(app)/_component/instruction/Step"

describe("Stepコンポーネントが正しくレンダリングされている", () => {
  test("propsで受け取ったstep「1」が正しく表示されている", () => {
    render(<Step step={1} />)

    expect(screen.getByText("1")).toBeInTheDocument()
  })
})
