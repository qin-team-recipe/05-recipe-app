import {
  createElement,
  Fragment,
  JSXElementConstructor,
  ReactElement,
} from "react"

import parse from "rehype-parse"
import rehypeReact, { Options as RehypeReactOptions } from "rehype-react"
import { unified } from "unified"

import { HiddenImage, Paragraph, VisibleImage } from "@/app/(app)/_lib/htmlTag"

const visibleImageOptions: RehypeReactOptions = {
  components: {
    img: VisibleImage,
    p: Paragraph,
  },
  createElement,
  Fragment,
}

const hiddenImageOptions: RehypeReactOptions = {
  components: {
    img: HiddenImage,
    p: Paragraph,
  },
  createElement,
  Fragment,
}

/** @package */
export const parseHtml = (
  content: string,
  type: "visibleImage" | "hiddenImage" = "hiddenImage",
): ReactElement<unknown, string | JSXElementConstructor<any>> => {
  return unified()
    .use(parse, { fragment: true })
    .use(
      rehypeReact,
      type === "visibleImage" ? visibleImageOptions : hiddenImageOptions,
    )
    .processSync(content).result
}
