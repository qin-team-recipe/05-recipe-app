import { createElement, Fragment } from "react"

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
export const parseHtml = (content: string) => {
  const htmlAst = unified()
    .use(parse, { fragment: true })
    .use(rehypeReact, rehypeOptions)
    .processSync(content).result

  return htmlAst
}
