"use client"

import React from "react"

import { useFormContext, type FieldValues, type Path } from "react-hook-form"
import { tv } from "tailwind-variants"

type TextFieldProps<T extends FieldValues> = {
  fieldName: Path<T>
  isMultiline?: boolean
  label: string
  placeholder?: string
}

const sTextField = tv({
  slots: {
    input: "w-full border-y border-mauve-7 px-4 py-3",
    label: "px-4 text-base font-bold leading-5",
    root: "flex flex-col gap-1",
  },
})

/** @package */
export const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { fieldName, isMultiline = false, label, placeholder } = props

  const { input: sInput, label: sLabel, root: sRoot } = sTextField()
  const {
    formState: { errors },
    register,
  } = useFormContext<T>()

  return (
    <div className={sRoot()}>
      <label htmlFor={fieldName} className={sLabel()}>
        {label}
      </label>
      {isMultiline ? (
        <textarea rows={4} className={sInput()} {...register(fieldName)} />
      ) : (
        <input
          id={fieldName}
          type="text"
          className={sInput()}
          placeholder={placeholder ?? ""}
          {...register(fieldName)}
        />
      )}
      {errors && (
        <span className="px-4 text-xs font-bold leading-5 text-tomato-9">
          {errors[fieldName]?.message as string}
        </span>
      )}
    </div>
  )
}
