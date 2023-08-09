import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { FollowRepository } from './repository';

@Module({
  providers: [FollowRepository, OrmClient],
  exports: [FollowRepository],
})
export class FollowRepositoryModule {}
