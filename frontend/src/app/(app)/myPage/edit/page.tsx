import React, { FC } from "react"

import { PageHeader } from "@/app/(app)/_component/header"
import { ProfileEditForm } from "@/app/(app)/myPage/edit/_component"

export const metadata = {
  title: "プロフィール編集｜マイページ",
}

const ProfileEditPage: FC = () => {
  return (
    <div className="h-screen bg-mauve-3">
      <PageHeader title="編集" titleAlign="center" />
      <ProfileEditForm />
    </div>
  )
}

export default ProfileEditPage
