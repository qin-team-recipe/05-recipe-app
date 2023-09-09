import React, { ReactNode } from "react"

type RegisterAddLayoutProps = {
  children: ReactNode
}

const RegisterAddLayout = (props: RegisterAddLayoutProps) => {
  const { children } = props

  return <div className="h-screen bg-mauve-2">{children}</div>
}

export default RegisterAddLayout
