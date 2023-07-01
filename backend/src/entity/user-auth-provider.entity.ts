import type { Prisma, UserAuthProvider } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const userAuthProvider = z.object({
  id: z.number().int().min(1, '1以上の数値を入力してください'),
  userId: z.string().cuid(),
  provider: z.enum(['GOOGLE', 'APPLE']),
  providerId: z.string().max(191, '191字未満で入力してください'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserAuthProviderCreateInputSchema: z.ZodType<Prisma.UserAuthProviderUncheckedCreateInput> =
  userAuthProvider.omit({ id: true, createdAt: true, updatedAt: true });

export const UserAuthProviderResponseSchema: z.ZodType<UserAuthProvider> =
  userAuthProvider;

export type UserAuthProviderCreateInput = Omit<
  z.infer<typeof UserAuthProviderCreateInputSchema>,
  'id' | 'createdAt'
>;

export type UserAuthProviderResponse = z.infer<
  typeof UserAuthProviderResponseSchema
>;

export class UserAuthProviderCreateInputDto extends createZodDto(
  UserAuthProviderCreateInputSchema,
) {}
