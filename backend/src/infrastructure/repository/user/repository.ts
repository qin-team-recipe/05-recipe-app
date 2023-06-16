import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';
import {
  UserCreateInput,
  UserResponse,
  UserUpdateInput,
} from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';

@Injectable()
export class UserRepository {
  constructor(
    private readonly orm: OrmClient,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(userProps: UserCreateInput): Promise<UserResponse> {
    try {
      return await this.orm.user.create({ data: userProps });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(userProps: UserUpdateInput): Promise<UserResponse | null> {
    if (typeof userProps.id !== 'string') {
      const error = new Error('id must be a string');
      this.logger.error(error);
      throw error;
    }

    try {
      return await this.orm.user.update({
        where: { id: userProps.id },
        data: userProps,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
