import React, { FC } from "react"

import { Login } from "@/app/(app)/_component/login"
import { LoginPageHeader } from "@/app/(app)/login/_component"

export const metadata = {
  title: "ログインページ",
}

type Props = {
  page: "favorite" | "shopping"
}

const LoginPage: FC<Props> = (props) => {
  const { page } = props

  return (
    <div>
      <LoginPageHeader page={page} />
      <Login page={page} />
    </div>
  )
}

export default LoginPage
