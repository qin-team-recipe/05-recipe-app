import { Module } from '@nestjs/common';
import { UserAuthProviderRepositoryModule } from 'src/infrastructure/repository/user-auth-provider/repository.module';
import { UserProfileRepositoryModule } from 'src/infrastructure/repository/user-profile/repository.module';
import { UserRepositoryModule } from 'src/infrastructure/repository/user/repository.module';

@Module({
  imports: [
    UserRepositoryModule,
    UserProfileRepositoryModule,
    UserAuthProviderRepositoryModule,
  ],
  providers: [],
  exports: [],
})
export class UserUseCaseModule {}
