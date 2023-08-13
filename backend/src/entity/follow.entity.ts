import { Follow, Prisma } from '@prisma/client';
import { z } from 'zod';

const follow = z.object({
  id: z.number(),
  followerId: z.string(),
  followedId: z.string(),
  createdAt: z.date(),
});

export const FollowCreateInputSchema: z.ZodType<Prisma.FollowUncheckedCreateInput> =
  follow.omit({ createdAt: true });

export const FollowResponseSchema: z.ZodType<Follow> = follow;

export type FollowCreateInput = z.infer<typeof FollowCreateInputSchema>;

export type FollowResponse = z.infer<typeof FollowResponseSchema>;
