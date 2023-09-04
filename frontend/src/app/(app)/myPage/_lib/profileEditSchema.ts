import {
  array,
  blob,
  minLength,
  object,
  optional,
  Output,
  string,
} from "valibot"

/** @package */
export const ProfileEditFormSchema = object({
  introduction: optional(string()),
  linkList: optional(
    array(
      object({
        // id: optional(number()),
        url: optional(string()),
      }),
    ),
  ),
  nickname: string([minLength(1, "ニックネームを入力してください")]),
  profileImage: optional(blob()),
})

/** @package */
export type TProfileEditFormSchema = Output<typeof ProfileEditFormSchema>
