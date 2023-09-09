import { Favorite, Prisma } from '@prisma/client';
import { z } from 'zod';

const favorite = z.object({
  id: z.number(),
  userId: z.string().cuid(),
  recipeId: z.string().cuid(),
  createdAt: z.date(),
});

export const FavoriteCreateInputSchema: z.ZodType<Prisma.FavoriteUncheckedCreateInput> =
  favorite.omit({ createdAt: true });

export const FavoriteResponseSchema: z.ZodType<Favorite> = favorite;

export type FavoriteCreateInput = z.infer<typeof FavoriteCreateInputSchema>;

export type FavoriteResponse = z.infer<typeof FavoriteResponseSchema>;
