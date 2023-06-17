import type { Prisma, Recipe, User, UserProfile } from '@prisma/client';
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
export const UserResponseWithRecipesSchema: z.ZodType<User> = user;

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;

export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;

export type UserResponse = z.infer<typeof UserResponseSchema>;

export type FindUserResponse = UserResponse & {
  userProfile: FindUserProfile | null;
  recipes: FindUserRecipe[];
};

export type PaginateUserResponse = (UserResponse & {
  userProfile: PaginateUserProfile | null;
})[];

export class UserCreateInputDto extends createZodDto(UserCreateInputSchema) {}

export class UserUpdateInputDto extends createZodDto(UserUpdateInputSchema) {}

type FindUserProfile = Omit<UserProfile, 'userId' | 'createdAt' | 'updatedAt'>;
type FindUserRecipe = Pick<
  Recipe,
  'id' | 'name' | 'description' | 'favoriteCount'
>;
type PaginateUserProfile = Pick<
  UserProfile,
  'nickname' | 'imgPath' | 'introduction' | 'recipeCount'
>;
