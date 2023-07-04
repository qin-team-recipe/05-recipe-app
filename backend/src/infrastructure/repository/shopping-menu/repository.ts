import { Injectable } from '@nestjs/common';
import {
  ShoppingMenuCreateInput,
  ShoppingMenuResponse,
  ShoppingMenuUpdateInput,
} from 'src/entity/shopping-menu.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
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

  // 買い物メニューを更新する
  async update(
    shoppingMenuProps: ShoppingMenuUpdateInput,
  ): Promise<ShoppingMenuResponse | null> {
    if (typeof shoppingMenuProps.id !== 'string') {
      const error = new InvalidArgsError('id must be a string');
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }

    try {
      return await this.orm.shoppingMenu.update({
        where: { id: shoppingMenuProps.id },
        data: shoppingMenuProps,
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
