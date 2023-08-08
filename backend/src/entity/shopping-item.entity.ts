import type { ShoppingItem } from '@prisma/client';
import { z } from 'zod';

const shoppingItem = z.object({
  id: z.number(),
  shoppingMenuId: z.string().cuid(),
  recipeItemName: z.string().cuid(),
  boughtFlag: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ShoppingItemResponseSchema: z.ZodType<ShoppingItem> = shoppingItem;

export type ShoppingItemUpdateInput = {
  shoppingMenuId: string;
  shoppingItemId: number;
  recipeItemName: string;
  boughtFlag: boolean;
};

export type ShoppingItemResponse = z.infer<typeof ShoppingItemResponseSchema>;
