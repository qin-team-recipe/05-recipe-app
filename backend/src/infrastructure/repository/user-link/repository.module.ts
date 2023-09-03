import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { UserLinkRepository } from './repository';

@Module({
  providers: [UserLinkRepository, OrmClient],
  exports: [UserLinkRepository],
})
export class UserLinkRepositoryModule {}
