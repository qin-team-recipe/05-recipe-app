import { Injectable } from '@nestjs/common';
import {
  FindUserProfileResponse,
  PaginateUserProfileResponse,
  UserProfileCreateInput,
  UserProfileResponse,
  UserProfileUpdateInput,
} from 'src/entity/user-profile.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class UserProfileRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // ユーザープロフィールを作成する
  async create(
    userProps: UserProfileCreateInput,
  ): Promise<UserProfileResponse> {
    try {
      return await this.orm.userProfile.create({ data: userProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // ユーザープロフィールを更新する
  async update(
    userProps: UserProfileUpdateInput,
  ): Promise<UserProfileResponse | null> {
    if (typeof userProps.userId !== 'string') {
      const error = new InvalidArgsError('user id must be a string');
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }

    try {
      return await this.orm.userProfile.update({
        where: { userId: userProps.userId },
        data: userProps,
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // ユーザープロフィールをユーザーIDで取得する
  async findByUserId(userId: string): Promise<FindUserProfileResponse | null> {
    try {
      return await this.orm.userProfile.findUnique({
        where: { userId },
        include: {
          recipes: {
            select: {
              id: true,
              name: true,
              description: true,
              favoriteCount: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // ユーザープロフィール一覧をページネーションで取得する
  async paginate(
    take: number,
    cursor?: string,
  ): Promise<PaginateUserProfileResponse> {
    try {
      return await this.orm.userProfile.findMany({
        take,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { userId: cursor } : undefined,
        orderBy: {
          nickname: 'asc',
        },
        select: {
          userId: true,
          nickname: true,
          imgPath: true,
          introduction: true,
          recipeCount: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
