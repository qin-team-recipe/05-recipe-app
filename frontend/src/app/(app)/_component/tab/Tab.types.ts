import { type Route } from "next"

/** @package */
export type Link = {
  href: Route<string> | URL
  pathname?: string
  tabLabel: string
}
