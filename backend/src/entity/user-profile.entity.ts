import type { Prisma, Recipe, UserProfile } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const userProfile = z.object({
  userId: z.string().cuid(),
  nickname: z.string().max(191, '191字未満で入力してください'),
  imgPath: z.string().max(191, '191字未満で入力してください').nullable(),
  introduction: z.string().max(1000, '1000字未満で入力してください'),
  twitterId: z.string().max(191, '191字未満で入力してください').nullable(),
  instagramId: z.string().max(191, '191字未満で入力してください').nullable(),
  siteUrl: z.string().max(1000, '1000字未満で入力してください').nullable(),
  followerCount: z.number().int().min(0, '0以上の数値を入力してください'),
  recipeCount: z.number().int().min(0, '0以上の数値を入力してください'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserProfileCreateInputSchema: z.ZodType<Prisma.UserProfileUncheckedCreateInput> =
  userProfile.omit({ createdAt: true, updatedAt: true });

export const UserProfileUpdateInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateInput> =
  userProfile.omit({ createdAt: true, updatedAt: true });

export const UserProfileResponseSchema: z.ZodType<UserProfile> = userProfile;
export const UserProfileResponseWithRecipesSchema: z.ZodType<UserProfile> =
  userProfile;

export type UserProfileCreateInput = z.infer<
  typeof UserProfileCreateInputSchema
>;

export type UserProfileUpdateInput = z.infer<
  typeof UserProfileUpdateInputSchema
>;

export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;

export type FindUserProfileResponse = UserProfileResponse & {
  recipes: FindUserProfileRecipe[];
};

export type PaginateUserProfileResponse = Pick<
  UserProfileResponse,
  'userId' | 'nickname' | 'imgPath' | 'introduction' | 'recipeCount'
>[];

export class UserProfileCreateInputDto extends createZodDto(
  UserProfileCreateInputSchema,
) {}

export class UserProfileUpdateInputDto extends createZodDto(
  UserProfileUpdateInputSchema,
) {}

type FindUserProfileRecipe = Pick<
  Recipe,
  'id' | 'title' | 'description' | 'favoriteCount'
>;
