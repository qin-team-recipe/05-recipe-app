import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { UserAuthProviderRepository } from './repository';

@Module({
  providers: [UserAuthProviderRepository, OrmClient],
  exports: [UserAuthProviderRepository],
})
export class UserAuthProviderRepositoryModule {}
