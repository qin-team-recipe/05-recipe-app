import { Injectable } from '@nestjs/common';
import {
  findManyByUserIdRecipeResponse,
  PickupListRecipeResponse,
  RecipeCreateInput,
  RecipeResponse,
  RecipeUpdateInput,
} from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class RecipeRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // レシピを作成する
  async create(recipeProps: RecipeCreateInput): Promise<RecipeResponse> {
    try {
      return await this.orm.recipe.create({ data: recipeProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // レシピを更新する
  async update(recipeProps: RecipeUpdateInput): Promise<RecipeResponse | null> {
    if (typeof recipeProps.id !== 'string') {
      const error = new InvalidArgsError('id must be a string');
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }

    try {
      return await this.orm.recipe.update({
        where: { id: recipeProps.id },
        data: recipeProps,
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // 話題のレシピ一覧をページネーションで取得する
  async pickupList(
    take: number,
    cursor?: string,
  ): Promise<PickupListRecipeResponse> {
    try {
      return await this.orm.recipe.findMany({
        take,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          favoriteCount: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          favoriteCount: true,
          recipeImages: {
            select: {
              path: true,
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

  // ユーザーのレシピ一覧をページネーションで取得する
  async findManyByUserId(
    userId: string,
    take: number,
    cursor?: string,
  ): Promise<findManyByUserIdRecipeResponse> {
    try {
      return await this.orm.recipe.findMany({
        take,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          favoriteCount: true,
          recipeImages: {
            select: {
              path: true,
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
