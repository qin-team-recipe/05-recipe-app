import { Module } from '@nestjs/common';
import { UserUseCaseModule } from '../use-case/user/use-case.module';

@Module({
  imports: [UserUseCaseModule],
  controllers: [],
})
export class UserModule {}
