import React from "react"

import { IconTrash } from "@tabler/icons-react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { BiPlus } from "react-icons/bi"
import { tv } from "tailwind-variants"

import { baseRecipeItem } from "@/app/(app)/_component/recipeItem"
import { TProfileEditFormSchema } from "@/app/(app)/myPage/_lib"

type LinkListProps = {
  label: string
}

const sLinkListItem = tv({
  extend: baseRecipeItem,
})

const sLinkList = tv({
  slots: {
    label: "px-4 text-base font-bold leading-5",
    linkListItem: sLinkListItem(),
    root: "flex flex-col gap-1",
  },
})

//TODO: fetchしたデータと追加するデータのマージ処理方法を検討
/** @package */
export const LinkList = (props: LinkListProps) => {
  const { label } = props

  const { control } = useFormContext<TProfileEditFormSchema>()
  const {
    append: appendLinkList,
    fields: linkListFields,
    remove: removeLinkList,
  } = useFieldArray<TProfileEditFormSchema>({
    control,
    name: "linkList",
  })

  const {
    label: sLabel,
    linkListItem: sLinkListItem,
    root: sRoot,
  } = sLinkList()

  const onClickAppend = () => {
    appendLinkList({
      url: "",
    })
  }

  const onClickRemove = (index: number) => {
    if (linkListFields.length === 1) {
      appendLinkList({
        url: "",
      })
    }
    return removeLinkList(index)
  }

  return (
    <div className={sRoot()}>
      <label className={sLabel()}>{label}</label>
      <div className="border-t border-t-mauve-7">
        {linkListFields.map((link, index) => {
          return (
            <Controller
              key={link.id}
              control={control}
              name={`linkList.${index}.url`}
              render={({ field }) => {
                return (
                  <div className="relative flex-1">
                    <input {...field} className={sLinkListItem()} />
                    <button
                      type="button"
                      onClick={() => {
                        return onClickRemove(index)
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-mauve-11"
                    >
                      <IconTrash />
                    </button>
                  </div>
                )
              }}
            />
          )
        })}
        <div className="px-4 pt-2">
          <button
            type="button"
            className="flex items-center gap-1 border-none text-tomato-9 outline-none"
            onClick={onClickAppend}
          >
            <BiPlus />
            <span>リンクを追加する</span>
          </button>
        </div>
      </div>
    </div>
  )
}
