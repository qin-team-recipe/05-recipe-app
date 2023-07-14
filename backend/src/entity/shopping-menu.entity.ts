import type { Prisma, ShoppingMenu } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const shoppingMenu = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  recipeId: z.string().cuid(),
  name: z.string().max(191, '191字未満で入力してください'),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ShoppingMenuCreateInputSchema: z.ZodType<Prisma.ShoppingMenuUncheckedCreateInput> =
  shoppingMenu.omit({ createdAt: true, updatedAt: true });

export const ShoppingMenuUpdateInputSchema: z.ZodType<Prisma.ShoppingMenuUncheckedUpdateInput> =
  shoppingMenu.omit({ createdAt: true, updatedAt: true });

export const ShoppingMenuResponseSchema: z.ZodType<ShoppingMenu> = shoppingMenu;

export type ShoppingMenuCreateInput = z.infer<
  typeof ShoppingMenuCreateInputSchema
>;
export type ShoppingMenuUpdateInput = z.infer<
  typeof ShoppingMenuUpdateInputSchema
>;
export type ShoppingMenuResponse = z.infer<typeof ShoppingMenuResponseSchema>;

export class ShoppingMenuCreateInputDto extends createZodDto(
  ShoppingMenuCreateInputSchema,
) {}

export class ShoppingMenuUpdateInputDto extends createZodDto(
  ShoppingMenuUpdateInputSchema,
) {}
