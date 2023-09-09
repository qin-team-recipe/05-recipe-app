import type { Prisma, UserProfile } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { UserLinkCreateInput } from 'src/entity/user-link.entity';
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

export const UserProfileCreateInputSchema: z.ZodType<
  Omit<Prisma.UserProfileUncheckedCreateInput, 'createdAt' | 'updatedAt'>
> = userProfile.omit({ createdAt: true, updatedAt: true });

export const UserProfileUpdateInputSchema: z.ZodType<Prisma.UserProfileUncheckedUpdateInput> =
  userProfile.omit({ createdAt: true, updatedAt: true });

export const UserProfileResponseSchema: z.ZodType<UserProfile> = userProfile;
export const UserProfileResponseWithRecipesSchema: z.ZodType<UserProfile> =
  userProfile;

export type UserProfileCreateInput = Omit<
  z.infer<typeof UserProfileCreateInputSchema>,
  'recipes' | 'userLinks'
> & {
  userLinks: Pick<UserLinkCreateInput, 'url'>[];
};

export type UserProfileUpdateInput = Omit<
  z.infer<typeof UserProfileUpdateInputSchema>,
  'createdAt' | 'updatedAt' | 'recipes' | 'userLinks'
>;

export type UserProfileResponse = UserProfile;

export type UserProfileWithUserLinksResponse = Prisma.UserProfileGetPayload<{
  include: { userLinks: true };
}>;

export type FindUserProfileResponse = Prisma.UserProfileGetPayload<{
  include: {
    recipes: {
      select: {
        id: true;
        title: true;
        description: true;
        favoriteCount: true;
      };
    };
    userLinks: true;
  };
}>;

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
