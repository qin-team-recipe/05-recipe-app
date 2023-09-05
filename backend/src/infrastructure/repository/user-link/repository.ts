import { Injectable } from '@nestjs/common';
import {
  UserLinkCreateInput,
  UserLinkResponse,
  UserLinkUpdateInput,
} from 'src/entity/user-link.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class UserLinkRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // ユーザーのリンクを一括作成する
  async bulkCreate(userProps: UserLinkCreateInput[]): Promise<void> {
    try {
      await this.orm.userLink.createMany({ data: userProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // ユーザーのリンクを更新する
  async update(
    userProps: UserLinkUpdateInput,
  ): Promise<UserLinkResponse | null> {
    if (typeof userProps.id !== 'number') {
      const error = new InvalidArgsError('user id must be a number');
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }

    try {
      return await this.orm.userLink.update({
        where: { id: userProps.id },
        data: {
          url: userProps.url,
        },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // ユーザーのリンクを削除する
  async delete(id: number): Promise<void> {
    try {
      await this.orm.userLink.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
