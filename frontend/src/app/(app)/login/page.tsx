import React, { FC } from "react"

import { Login } from "@/app/(app)/_component/login"
import { LoginPageHeader } from "@/app/(app)/login/_component"

export const metadata = {
  title: "ログインページ",
}

const LoginPage: FC = () => {
  const pageType = "favorite"

  return (
    <div>
      <LoginPageHeader page={pageType} />
      <Login page={pageType} />
    </div>
  )
}

export default LoginPage
