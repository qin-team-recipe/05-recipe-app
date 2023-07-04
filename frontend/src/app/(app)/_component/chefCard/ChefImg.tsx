import React, { FC } from "react"
import Image from "next/image"

import { tv } from "tailwind-variants"

type ChefImgProps = {
  img?: string
  rounded?: "full" | "default"
}

const image = tv({
  base: "h-full w-full bg-amber-5",
  variants: {
    rounded: {
      default: "rounded-2xl",
      full: "rounded-full",
    },
  },
})

/** @package */
export const ChefImg: FC<ChefImgProps> = (props) => {
  const { img, rounded = "default" } = props

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
        className={image({ rounded })}
      />
    </div>
  )
}
