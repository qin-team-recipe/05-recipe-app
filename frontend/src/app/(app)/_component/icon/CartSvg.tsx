import React, { FC } from "react"

type IconProps = {
  color: string
  height: number
  width: number
}

/** @package */
export const CartSvg: FC<IconProps> = (props) => {
  const { color, height, width } = props

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
        d="M8.33325 22C8.88554 22 9.33325 21.5523 9.33325 21C9.33325 20.4477 8.88554 20 8.33325 20C7.78097 20 7.33325 20.4477 7.33325 21C7.33325 21.5523 7.78097 22 8.33325 22Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.3333 22C19.8855 22 20.3333 21.5523 20.3333 21C20.3333 20.4477 19.8855 20 19.3333 20C18.781 20 18.3333 20.4477 18.3333 21C18.3333 21.5523 18.781 22 19.3333 22Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.3833 2.04999H4.3833L7.0433 14.47C7.14088 14.9248 7.39397 15.3315 7.75901 15.6198C8.12405 15.9082 8.57821 16.0603 9.0433 16.05H18.8233C19.2785 16.0493 19.7198 15.8933 20.0743 15.6078C20.4289 15.3224 20.6754 14.9245 20.7733 14.48L22.4233 7.04999H5.4533"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
