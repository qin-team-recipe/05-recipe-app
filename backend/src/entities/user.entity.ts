import type { Prisma, User } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const user = z.object({
  id: z.string().cuid(),
  email: z.string().email('形式が不正です'),
  provider: z.enum(['GOOGLE', 'APPLE']),
  providerId: z.string().max(191, '191字未満で入力してください'),
  nickname: z.string().max(191, '191字未満で入力してください'),
  imgPath: z.string().max(191, '191字未満で入力してください').nullable(),
  introduction: z.string().max(1000, '1000字未満で入力してください'),
  twitterId: z.string().max(191, '191字未満で入力してください').nullable(),
  instagramId: z.string().max(191, '191字未満で入力してください').nullable(),
  siteUrl: z.string().max(1000, '1000字未満で入力してください').nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
  user.omit({ id: true, createdAt: true, updatedAt: true });

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> =
  user.omit({ createdAt: true, updatedAt: true });

export const UserResponseSchema: z.ZodType<User> = user;

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;

export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;

export type UserResponse = z.infer<typeof UserResponseSchema>;

export class UserCreateInputDto extends createZodDto(UserCreateInputSchema) {}

export class UserUpdateInputDto extends createZodDto(UserUpdateInputSchema) {}
