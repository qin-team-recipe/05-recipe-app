import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';
import { UserCreateInput, UserResponse } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';

@Injectable()
export class UserRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(userProps: UserCreateInput): Promise<UserResponse> {
    try {
      return this.orm.user.create({ data: userProps });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
