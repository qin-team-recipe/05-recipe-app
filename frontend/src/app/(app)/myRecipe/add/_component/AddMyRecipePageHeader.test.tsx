import React from "react"

import { render, screen } from "@testing-library/react"

import { AddMyRecipePageHeader } from "@/app/(app)/myRecipe/add/_component/AddMyRecipePageHeader"

describe("AddMyRecipePageHeaderが正しくレンダリングされている", () => {
  test("「X」ボタンと「下書き一覧」ボタンがレンダリングされている", () => {
    render(<AddMyRecipePageHeader />)

    expect(screen.getByTestId("close")).toBeInTheDocument()
    expect(screen.getByText("下書き一覧")).toBeInTheDocument()
  })
})
