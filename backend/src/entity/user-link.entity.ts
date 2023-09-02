import type { Prisma, UserLink } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const userLink = z.object({
  id: z.number().int(),
  userId: z.string().cuid(),
  url: z.string().url('URLの形式が不正です'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserLinkCreateInputSchema: z.ZodType<Prisma.UserLinkUncheckedCreateInput> =
  userLink;

export const UserLinkUpdateInputSchema: z.ZodType<Prisma.UserLinkUncheckedUpdateInput> =
  userLink.omit({ createdAt: true, updatedAt: true });

export const UserLinkResponseSchema: z.ZodType<UserLink> = userLink;
export const UserLinkResponseWithRecipesSchema: z.ZodType<UserLink> = userLink;

export type UserLinkCreateInput = z.infer<typeof UserLinkCreateInputSchema>;

export type UserLinkUpdateInput = Omit<
  z.infer<typeof UserLinkUpdateInputSchema>,
  'createdAt' | 'updatedAt' | 'recipes' | 'userLinks'
>;

export type UserLinkResponse = UserLink;

export class UserLinkCreateInputDto extends createZodDto(
  UserLinkCreateInputSchema,
) {}

export class UserLinkUpdateInputDto extends createZodDto(
  UserLinkUpdateInputSchema,
) {}
