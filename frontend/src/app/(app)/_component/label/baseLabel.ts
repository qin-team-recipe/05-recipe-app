import { tv } from "tailwind-variants"

/** @package */
export const baseLabel = tv({
  base: "text-mauve-normal text-sm font-normal leading-[22px]",
  variants: {
    fontWeight: {
      bold: "font-bold",
    },
    size: {
      xl: "text-xl leading-7",
    },
  },
})
