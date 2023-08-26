import React, { FC } from "react"
import Image from "next/image"

import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react"

type LoginProps = {
  page: string
}

/** @package */
export const Login: FC<LoginProps> = (props) => {
  const { page } = props
  return (
    <div className="flex flex-col items-center">
      {page === "favorite" ? (
        <Image
          src="/login-favorite.png"
          alt="お気に入りログイン"
          width={200}
          height={200}
          className="py-5"
        />
      ) : (
        <Image
          src="/login-shopping.png"
          alt="買い物リストログイン"
          width={200}
          height={200}
          className="py-5"
        />
      )}
      <div className="pb-3 text-lg font-bold">ログインをお願いします</div>
      <div className="">こちらの機能を利用するにはログインが必要です</div>
      <div className="flex gap-3 py-5">
        <button className="flex items-center gap-1 rounded-md bg-blue-10 px-3 py-2 text-mauve-1 hover:bg-blue-9">
          <IconBrandGoogle stroke={3} width={20} height={20} />
          <div className="font-bold">Googleログイン</div>
        </button>
        <button className="flex items-center gap-1 rounded-md bg-mauve-10 px-3 py-2 text-mauve-1 hover:bg-mauve-9">
          <IconBrandApple stroke={3} width={20} height={20} />
          <div className="font-bold">Appleログイン</div>
        </button>
      </div>
    </div>
  )
}
