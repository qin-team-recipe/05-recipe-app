import { handlers } from "@/mock/handlers"
import { setupServer } from "msw/node"

/** @package */
// export const worker = setupWorker(...handlers)
export const worker = setupServer(...handlers)
