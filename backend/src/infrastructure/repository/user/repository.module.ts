import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { UserRepository } from './repository';

@Module({
  providers: [UserRepository, OrmClient],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
