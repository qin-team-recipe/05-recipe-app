"use client"

import React, { FC, useState } from "react"

type TextAreaCommonProps = {
  isRequired?: boolean
  name: string
  title: string
}

export const TextAreaCommon: FC<TextAreaCommonProps> = (props) => {
  const { isRequired = false, name, title } = props
  const [text, setText] = useState("")
  return (
    <div className="flex flex-col gap-1">
      <label className="px-4 text-base font-bold leading-5">
        {title}
        {isRequired ? "" : "（任意）"}
      </label>
      <textarea
        className="form-input h-[4.5rem] w-full border-y border-mauve-7 px-4 py-3"
        name={name}
        required={isRequired}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
    </div>
  )
}
