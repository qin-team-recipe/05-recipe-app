import React, { FC } from "react"
import Image from "next/image"

type ChefImgProps = {
  img?: string
}

/** @package */
export const ChefImg: FC<ChefImgProps> = (props) => {
  const { img } = props

  return (
    <div className="h-full w-full">
      {/* TODO: imageがnullの場合の画像用意 */}
      <Image
        src={img ?? "/pizza.jpg"}
        alt="chef"
        width={150}
        height={150}
        style={{
          objectFit: "cover",
        }}
        className="h-full w-full rounded-2xl bg-amber-5"
      />
    </div>
  )
}
