import React from "react"
import Link from "next/link"

import {
  IconAlertCircle,
  IconArrowUpRight,
  IconChevronRight,
  IconLogout,
} from "@tabler/icons-react"

import { ContentContainer } from "@/app/(app)/_component/container"
import { SettingsPageHeader } from "@/app/(app)/settings/_component"

export const metadata = {
  title: "設定",
}

export default function SettingsPage() {
  return (
    <div>
      <SettingsPageHeader />
      <ContentContainer>
        <div className="text-mauve-normal">
          <div className="py-3 font-bold">利用規約やお問い合わせ</div>
          <div>
            <Link
              href="/terms"
              className="flex items-center justify-between py-3"
            >
              <div>利用規約</div>
              <IconChevronRight className="h-6 w-6 text-mauve-12 dark:text-mauve-1" />
            </Link>
            <Link
              // href="/privacy"
              href="/terms"
              className="flex items-center justify-between py-3"
            >
              <div>プライバシーポリシー</div>
              <IconChevronRight className="h-6 w-6 text-mauve-12 dark:text-mauve-1" />
            </Link>
            <Link href="/" className="flex items-center justify-between py-3">
              <div>運営会社</div>
              <IconArrowUpRight className="h-6 w-6 text-mauve-12 dark:text-mauve-1" />
            </Link>
            <Link href="/" className="flex items-center justify-between py-3">
              <div>お問い合わせ</div>
              <IconArrowUpRight className="h-6 w-6 text-mauve-12 dark:text-mauve-1" />
            </Link>
          </div>
          <div className="py-3 font-bold">アカウントの操作</div>
          <button className="flex w-full items-center justify-between py-3">
            <div className="flex-1 text-left">ログアウト</div>
            <IconLogout className="h-6 w-6 text-mauve-12 dark:text-mauve-1" />
          </button>
          <div className="py-3 font-bold">取り消しができない操作</div>
          <button className="flex w-full items-center justify-between py-3">
            <div className="flex-1 text-left">退会する</div>
            <IconAlertCircle className="h-6 w-6 text-mauve-12 dark:text-mauve-1" />
          </button>
        </div>
      </ContentContainer>
    </div>
  )
}
