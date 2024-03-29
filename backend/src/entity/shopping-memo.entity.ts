import type { Prisma, ShoppingMemo } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const shoppingMemo = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  name: z.string().max(191, '191字未満で入力してください'),
  boughtFlag: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ShoppingMemoCreateInputSchema: z.ZodType<Prisma.ShoppingMemoUncheckedCreateInput> =
  shoppingMemo.omit({ createdAt: true, updatedAt: true });

export const ShoppingMemoUpdateInputSchema: z.ZodType<Prisma.ShoppingMemoUncheckedUpdateInput> =
  shoppingMemo.omit({ createdAt: true, updatedAt: true });

export const ShoppingMemoResponseSchema: z.ZodType<ShoppingMemo> = shoppingMemo;

export type ShoppingMemoCreateInput = z.infer<
  typeof ShoppingMemoCreateInputSchema
>;
export type ShoppingMemoUpdateInput = z.infer<
  typeof ShoppingMemoUpdateInputSchema
>;
export type ShoppingMemoResponse = z.infer<typeof ShoppingMemoResponseSchema>;

export type FindManyShoppingMemoResponse = Pick<
  ShoppingMemoResponse,
  'id' | 'userId' | 'name' | 'boughtFlag' | 'createdAt'
>[];

export class ShoppingMemoCreateInputDto extends createZodDto(
  ShoppingMemoCreateInputSchema,
) {}

export class ShoppingMemoUpdateInputDto extends createZodDto(
  ShoppingMemoUpdateInputSchema,
) {}
