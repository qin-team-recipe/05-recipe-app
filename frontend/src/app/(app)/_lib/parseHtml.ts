import {
  createElement,
  Fragment,
  JSXElementConstructor,
  ReactElement,
} from "react"

import parse from "rehype-parse"
import rehypeReact, { Options as RehypeReactOptions } from "rehype-react"
import { unified } from "unified"

import { Paragraph } from "@/app/(app)/_lib/htmlTag"

const rehypeOptions: RehypeReactOptions = {
  components: {
    p: Paragraph,
  },
  createElement,
  Fragment,
}

/** @package */
export const parseHtml = (
  content: string,
): ReactElement<unknown, string | JSXElementConstructor<any>> => {
  return unified()
    .use(parse, { fragment: true })
    .use(rehypeReact, rehypeOptions)
    .processSync(content).result
}
