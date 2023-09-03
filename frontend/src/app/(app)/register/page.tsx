import React, { FC } from "react"

import {
  RegisterForm,
  RegisterPageHeader,
} from "@/app/(app)/register/_component"

export const metadata = {
  title: "新規登録ページ",
}

const LoginPage: FC = () => {
  return (
    <div>
      <RegisterPageHeader />
      <RegisterForm />
    </div>
  )
}

export default LoginPage
