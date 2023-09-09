import { Injectable } from '@nestjs/common';
import {
  FavoriteCreateInput,
  FavoriteResponse,
} from 'src/entity/favorite.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class FavoriteRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // いいね作成
  async create(favoriteProps: FavoriteCreateInput): Promise<FavoriteResponse> {
    try {
      return await this.orm.favorite.create({ data: favoriteProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // レシピのいいねを取得
  async findById(
    recipeId: string,
    userId: string,
  ): Promise<FavoriteResponse | null> {
    try {
      return await this.orm.favorite.findFirst({
        where: { recipeId, userId },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // いいねをIDで削除する
  async delete(id: number): Promise<void> {
    try {
      await this.orm.favorite.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
