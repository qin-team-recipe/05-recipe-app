import React from "react"

import { MyPageHeader } from "@/app/(app)/myPage/_component"

export const metadata = {
  title: "マイページ",
}

const MyPage = () => {
  return (
    <div>
      <MyPageHeader />
      マイページ
    </div>
  )
}

export default MyPage
