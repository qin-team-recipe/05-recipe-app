import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { UserProfileRepository } from './repository';

@Module({
  providers: [UserProfileRepository, OrmClient],
  exports: [UserProfileRepository],
})
export class UserProfileRepositoryModule {}
