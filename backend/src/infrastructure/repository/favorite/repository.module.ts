import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { FavoriteRepository } from './repository';

@Module({
  providers: [FavoriteRepository, OrmClient],
  exports: [FavoriteRepository],
})
export class FavoriteRepositoryModule {}
