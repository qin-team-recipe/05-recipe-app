import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../infrastructure/repository/user/repository.module';

@Module({
  imports: [UserRepositoryModule],
  providers: [],
  exports: [],
})
export class UserUseCaseModule {}
