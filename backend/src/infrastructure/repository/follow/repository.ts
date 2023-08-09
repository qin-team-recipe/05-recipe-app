import { Injectable } from '@nestjs/common';
import { FollowCreateInput, FollowResponse } from 'src/entity/follow.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class FollowRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // フォロー作成
  async create(followProps: FollowCreateInput): Promise<FollowResponse> {
    try {
      return await this.orm.follow.create({ data: followProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // シェフのフォローを取得
  async findById(
    followerId: string,
    followedId: string,
  ): Promise<FollowResponse | null> {
    try {
      return await this.orm.follow.findFirst({
        where: { followerId, followedId },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // フォロー削除
  async delete(id: number): Promise<void> {
    try {
      await this.orm.follow.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
