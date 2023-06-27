import { Injectable } from '@nestjs/common';
import {
  UserAuthProviderCreateInput,
  UserAuthProviderResponse,
} from 'src/entity/user-auth-provider.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { prismaErrorHandling } from 'src/infrastructure/repository/prisma-error-handling';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

@Injectable()
export class UserAuthProviderRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  // ユーザーの認証プロバイダ情報を作成する
  async create(
    userProps: UserAuthProviderCreateInput,
  ): Promise<UserAuthProviderResponse> {
    try {
      return await this.orm.userAuthProvider.create({ data: userProps });
    } catch (error) {
      this.logger.error(error);
      prismaErrorHandling(error);
      throw error;
    }
  }
}
