import type { Prisma, Recipe } from '@prisma/client';
import { z } from 'zod';

const recipe = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  name: z.string().max(191, '191字未満で入力してください'),
  description: z.string().max(1000, '1000字未満で入力してください'),
  servingCount: z.number().min(1, '1以上の数字で入力してください'),
  favoriteCount: z.number().nullable(),
  draftFlag: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RecipeCreateInputSchema: z.ZodType<Prisma.RecipeUncheckedCreateInput> =
  recipe.omit({ id: true, createdAt: true, updatedAt: true });

export const RecipeResponseSchema: z.ZodType<Recipe> = recipe;

export type RecipeCreateInput = z.infer<typeof RecipeCreateInputSchema>;
export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;
