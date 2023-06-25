import { Route } from "next"

/** @package */
export type SubButtonLink = {
  href: Route<string> | URL
  label: "もっと見る" | "まとめてお買物に追加" | "マイレシピを作成"
}
