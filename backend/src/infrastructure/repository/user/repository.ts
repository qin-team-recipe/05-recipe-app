import { Injectable } from '@nestjs/common';
import {
  FindUserResponse,
  PaginateUserResponse,
  UserCreateInput,
  UserResponse,
  UserUpdateInput,
  UserWithAuthProvidersResponse,
} from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // ユーザーと認証プロバイダを作成する
  async createWithAuthProvider({
    email,
    provider,
    providerId,
  }: UserCreateInput): Promise<UserWithAuthProvidersResponse> {
    try {
      return await this.orm.user.create({
        data: {
          email,
          userAuthProviders: {
            create: {
              provider,
              providerId,
            },
          },
        },
        include: {
          userAuthProviders: {
            select: {
              provider: true,
              providerId: true,
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

  // ユーザーを更新する
  async update(userProps: UserUpdateInput): Promise<UserResponse | null> {
    if (typeof userProps.id !== 'string') {
      const error = new InvalidArgsError('id must be a string');
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }

    try {
      return await this.orm.user.update({
        where: { id: userProps.id },
        data: userProps,
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // ユーザーをIDで取得する
  async findById(id: string): Promise<FindUserResponse | null> {
    try {
      return await this.orm.user.findUnique({
        where: { id },
        include: {
          userProfile: {
            select: {
              nickname: true,
              imgPath: true,
              introduction: true,
              followerCount: true,
              recipeCount: true,
              userLinks: {
                select: {
                  id: true,
                  url: true,
                },
              },
            },
          },
          recipes: {
            select: {
              id: true,
              title: true,
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

  // ユーザーをemailで取得する
  async findByEmail(
    email: string,
  ): Promise<UserWithAuthProvidersResponse | null> {
    try {
      return await this.orm.user.findUnique({
        where: { email },
        include: {
          userAuthProviders: {
            select: {
              userId: true,
              provider: true,
              providerId: true,
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

  // ユーザー一覧をページネーションで取得する
  async paginate(
    page?: number,
    perPage?: number,
  ): Promise<PaginateUserResponse> {
    try {
      return await this.orm.user.findMany({
        skip: page && perPage ? perPage * (page - 1) : undefined,
        take: perPage,
        include: {
          userProfile: {
            select: {
              nickname: true,
              imgPath: true,
              introduction: true,
              recipeCount: true,
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
}
