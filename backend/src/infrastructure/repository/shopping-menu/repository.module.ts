import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { ShoppingMenuRepository } from './repository';

@Module({
  providers: [ShoppingMenuRepository, OrmClient],
  exports: [ShoppingMenuRepository],
})
export class ShoppingMenuRepositoryModule {}
