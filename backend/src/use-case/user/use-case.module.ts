import { Module } from '@nestjs/common';
import { UserAuthProviderRepositoryModule } from 'src/infrastructure/repository/user-auth-provider/repository.module';
import { UserLinkRepository } from 'src/infrastructure/repository/user-link/repository';
import { UserProfileRepositoryModule } from 'src/infrastructure/repository/user-profile/repository.module';
import { UserRepositoryModule } from 'src/infrastructure/repository/user/repository.module';

@Module({
  imports: [
    UserRepositoryModule,
    UserProfileRepositoryModule,
    UserAuthProviderRepositoryModule,
    UserLinkRepository,
  ],
  providers: [],
  exports: [],
})
export class UserUseCaseModule {}
