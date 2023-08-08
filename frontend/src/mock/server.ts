import { handlers } from "@/mock/handlers"
import { setupServer } from "msw/node"

/** @package */
export const server = setupServer(...handlers)
