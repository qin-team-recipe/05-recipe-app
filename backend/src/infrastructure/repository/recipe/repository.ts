import { Injectable } from '@nestjs/common';
import {
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
}