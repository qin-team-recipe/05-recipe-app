import React, { ChangeEvent } from "react"

import { IconPlus } from "@tabler/icons-react"
import { type FieldValues, type Path } from "react-hook-form"
import { tv } from "tailwind-variants"

type ImageInputFieldProps<T extends FieldValues> = {
  fieldName: Path<T>
  label: string
}

const sImageInputField = tv({
  slots: {
    icon: "h-5 w-5",
    input:
      "flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border border-mauve-6 bg-mauve-1 text-xs text-mauve-11",
    label: "text-base font-bold leading-5",
    root: "flex flex-col gap-1 px-4",
  },
})

/** @package */
export const ImageInputField = <T extends FieldValues>(
  props: ImageInputFieldProps<T>,
) => {
  const { label } = props

  // const methods = useFormContext<T>()

  const {
    icon: sIcon,
    input: sInput,
    label: sLabel,
    root: sRoot,
  } = sImageInputField()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // eslint-disable-next-line no-console
    console.log(file)
  }

  return (
    <div className={sRoot()}>
      <h2 className={sLabel()}>{label}</h2>

      <div>
        <input type="file" id="file" className="hidden" onChange={onChange} />
        <label htmlFor="file" className={sInput()}>
          <p>画像を設定</p>
          <IconPlus className={sIcon()} />
        </label>
      </div>
    </div>
  )
}
