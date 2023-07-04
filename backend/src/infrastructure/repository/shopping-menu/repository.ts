import { Injectable } from '@nestjs/common';
import {
  ShoppingMenuCreateInput,
  ShoppingMenuResponse,
} from 'src/entity/shopping-menu.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class ShoppingMenuRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // 買い物メニューを作成する
  async create(
    shoppingMenuProps: ShoppingMenuCreateInput,
  ): Promise<ShoppingMenuResponse> {
    try {
      return await this.orm.shoppingMenu.create({ data: shoppingMenuProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
