import { Module } from '@nestjs/common';
import { UserUseCaseModule } from '../usecase/user/usecase.module';

@Module({
  imports: [UserUseCaseModule],
  controllers: [],
})
export class UserModule {}
