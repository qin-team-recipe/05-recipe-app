import type {
  Prisma,
  User,
  UserAuthProvider,
  UserProfile,
} from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const user = z.object({
  id: z.string().cuid(),
  email: z.string().email('形式が不正です'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
  user.pick({ email: true });

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> =
  user.omit({ createdAt: true, updatedAt: true });

export const UserResponseSchema: z.ZodType<User> = user;

export const UserResponseWithRecipesSchema: z.ZodType<User> = user;

export type UserCreateInput = Prisma.UserCreateInput &
  Pick<Prisma.UserAuthProviderCreateInput, 'provider' | 'providerId'>;

export type UserUpdateInput = Pick<
  z.infer<typeof UserUpdateInputSchema>,
  'id' | 'email'
>;

export type UserResponse = z.infer<typeof UserResponseSchema>;

export type UserWithAuthProvidersResponse = UserResponse & {
  userAuthProviders: Pick<UserAuthProvider, 'provider' | 'providerId'>[];
};

export type FindUserResponse = Prisma.UserGetPayload<{
  include: {
    userProfile: {
      select: {
        nickname: true;
        imgPath: true;
        introduction: true;
        followerCount: true;
        recipeCount: true;
        userLinks: {
          select: {
            id: true;
            url: true;
          };
        };
      };
    };
    recipes: {
      select: {
        id: true;
        title: true;
        description: true;
        favoriteCount: true;
      };
    };
  };
}>;

export type PaginateUserResponse = (UserResponse & {
  userProfile: PaginateUserProfile | null;
})[];

export class UserCreateInputDto extends createZodDto(UserCreateInputSchema) {}

export class UserUpdateInputDto extends createZodDto(UserUpdateInputSchema) {}

type PaginateUserProfile = Pick<
  UserProfile,
  'nickname' | 'imgPath' | 'introduction' | 'recipeCount'
>;
