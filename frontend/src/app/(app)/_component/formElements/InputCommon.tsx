import React, { ChangeEvent, FC, useState } from "react"

import { BiPlus } from "react-icons/bi"

/** 共通入力フォームのprops */
type InputCommonProps = {
  isRequired?: boolean
  name: string
  placeholder?: string
  title: string
  type: "text" | "image"
}
/** 共通入力フォーム */
/** @package */
export const InputCommon: FC<InputCommonProps> = (props) => {
  const { isRequired, name, placeholder, title, type } = props
  const [text, setText] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
  }

  const textInput = (
    <div className="flex flex-col gap-1">
      <label className="px-4 text-base font-bold leading-5">
        {title}
        {isRequired ?? "（任意）"}
      </label>
      <input
        name={name}
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
        className="w-full border-y border-mauve-7 px-4 py-3"
        placeholder={placeholder ? placeholder : ""}
        required={isRequired}
      />
    </div>
  )

  const imageInput = (
    <div className="flex flex-col gap-1 px-4">
      <h2 className="text-base font-bold leading-5">
        {title}
        {isRequired ?? "（任意）"}
      </h2>
      <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-mauve-6 bg-mauve-1 text-mauve-11">
        <span className="font-inter text-xs font-normal">画像を設定</span>
        <span className="text-gray-400 text-2xl">
          <BiPlus />
        </span>
        <input
          name={name}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )

  switch (type) {
    case "text":
      return textInput
    case "image":
      return imageInput
  }
}
