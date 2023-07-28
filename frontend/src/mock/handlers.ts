import { getChef, getRecipe } from "@/mock/api"
import { rest } from "msw"

/** @package */
export const baseUrl = "http://localhost:3000"

/** @package */
export const handlers = [
  rest.get(`${baseUrl}/chef/:chefId`, getChef),
  rest.get(`${baseUrl}/recipe/:recipeId`, getRecipe),
]