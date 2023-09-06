import { minLength, object, Output, string } from "valibot"

/** @package */
export const RegisterFormSchema = object({
  nickname: string([minLength(1, "ニックネームを入力してください")]),
})

/** @package */
export type TRegisterFormSchema = Output<typeof RegisterFormSchema>
