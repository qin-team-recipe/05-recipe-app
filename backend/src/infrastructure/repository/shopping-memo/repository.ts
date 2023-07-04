import { Injectable } from '@nestjs/common';
import {
  ShoppingMemoCreateInput,
  ShoppingMemoResponse,
} from 'src/entity/shopping-memo.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class ShoppingMemoRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // 買い物メモを作成する
  async create(
    shoppingMemoProps: ShoppingMemoCreateInput,
  ): Promise<ShoppingMemoResponse> {
    try {
      return await this.orm.shoppingMemo.create({ data: shoppingMemoProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
