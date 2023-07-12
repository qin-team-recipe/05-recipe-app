import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { ShoppingMemoRepository } from './repository';

@Module({
  providers: [ShoppingMemoRepository, OrmClient],
  exports: [ShoppingMemoRepository],
})
export class ShoppingMemoRepositoryModule {}
