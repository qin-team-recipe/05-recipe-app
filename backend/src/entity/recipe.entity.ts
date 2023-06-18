import type { Prisma, Recipe } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const recipe = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  name: z.string().max(191, '191字未満で入力してください'),
  description: z.string().max(1000, '1000字未満で入力してください'),
  servingCount: z
    .number()
    .int('整数を入力してください')
    .min(1, '1以上の数値を入力してください'),
  favoriteCount: z
    .number()
    .int('整数を入力してください')
    .nonnegative('0以上の数値を入力してください'),
  draftFlag: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RecipeCreateInputSchema: z.ZodType<Prisma.RecipeUncheckedCreateInput> =
  recipe.omit({ id: true, createdAt: true, updatedAt: true });

export const RecipeUpdateInputSchema: z.ZodType<Prisma.RecipeUncheckedCreateInput> =
  recipe.omit({ createdAt: true, updatedAt: true });

export const RecipeResponseSchema: z.ZodType<Recipe> = recipe;

export type RecipeCreateInput = Required<
  Pick<
    z.infer<typeof RecipeCreateInputSchema>,
    | 'userId'
    | 'name'
    | 'description'
    | 'servingCount'
    | 'favoriteCount'
    | 'draftFlag'
    | 'recipeImages'
    | 'recipeSteps'
    | 'recipeLinks'
    | 'recipeItems'
  >
>;

export type RecipeUpdateInput = z.infer<typeof RecipeUpdateInputSchema>;

export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;

export class RecipeCreateInputDto extends createZodDto(
  RecipeCreateInputSchema,
) {}

export class RecipeUpdateInputDto extends createZodDto(
  RecipeUpdateInputSchema,
) {}
