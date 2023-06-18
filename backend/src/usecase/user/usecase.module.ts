import { Module } from '@nestjs/common';
import { UserProfileRepositoryModule } from 'src/infrastructure/repository/user-profile/repository.module';
import { UserRepositoryModule } from 'src/infrastructure/repository/user/repository.module';

@Module({
  imports: [UserRepositoryModule, UserProfileRepositoryModule],
  providers: [],
  exports: [],
})
export class UserUseCaseModule {}
