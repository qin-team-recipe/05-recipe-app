import React, { FC } from "react"

type IconProps = {
  color: string
  height: number
  strokeWidth?: string
  width: number
}

/** @package */
export const SearchSvg: FC<IconProps> = (props) => {
  const { color, height, strokeWidth = "2", width } = props

  return (
    <svg
      className={color}
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6666 19C16.0849 19 19.6666 15.4183 19.6666 11C19.6666 6.58172 16.0849 3 11.6666 3C7.24835 3 3.66663 6.58172 3.66663 11C3.66663 15.4183 7.24835 19 11.6666 19Z"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.6667 21L17.3167 16.65"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
