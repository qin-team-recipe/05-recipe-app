import { Injectable } from '@nestjs/common';
import {
  ShoppingItemResponse,
  ShoppingItemUpdateInput,
} from 'src/entity/shopping-item.entity';
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
  async updateMenu(
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
  // 買い物材料を更新する
  async updateItem({
    shoppingItemId,
    recipeItemName,
    boughtFlag,
  }: ShoppingItemUpdateInput): Promise<ShoppingItemResponse | null> {
    try {
      return await this.orm.shoppingItem.update({
        where: { id: shoppingItemId },
        data: { recipeItemName, boughtFlag },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // 買い物メニューを削除する
  async deleteMenu(id: string): Promise<void> {
    try {
      await this.orm.shoppingMenu.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }

  // 買い物材料を削除する
  async bulkDeleteItems(itemIdList: number[]): Promise<void> {
    try {
      await this.orm.shoppingItem.deleteMany({
        where: { id: { in: itemIdList } },
      });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
