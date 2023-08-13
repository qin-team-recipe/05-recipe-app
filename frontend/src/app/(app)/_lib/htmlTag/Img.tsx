import React, { FC } from "react"
import Image from "next/image"

type ImgProps = {
  alt?: string
  src?: string
}

/** @package */
export const VisibleImage: FC<ImgProps> = (props) => {
  const { alt = "", src = "" } = props

  return <Image alt={alt} src={src} width={100} height={100} />
}

/** @package */
export const HiddenImage: FC = () => {
  return null
}
