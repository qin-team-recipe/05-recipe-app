import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';
import {
  FindUserResponse,
  UserCreateInput,
  UserResponse,
  UserUpdateInput,
} from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';

@Injectable()
export class UserRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // ユーザーを作成する
  async create(userProps: UserCreateInput): Promise<UserResponse> {
    try {
      return await this.orm.user.create({ data: userProps });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // ユーザーを更新する
  async update(userProps: UserUpdateInput): Promise<UserResponse | null> {
    if (typeof userProps.id !== 'string') {
      const error = new Error('id must be a string');
      this.logger.error(error);
      throw error;
    }

    try {
      return await this.orm.user.update({
        where: { id: userProps.id },
        data: userProps,
      });
    } catch (error) {
      this.logger.error(error);
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
              twitterId: true,
              instagramId: true,
              siteUrl: true,
              followerCount: true,
              recipeCount: true,
            },
          },
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
      throw error;
    }
  }
}
