import { Injectable } from '@nestjs/common';
import { RecipeCreateInput, RecipeResponse } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
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
}
