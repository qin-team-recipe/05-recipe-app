import { Injectable } from '@nestjs/common';
import { UserCreateInput, UserResponse } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';

@Injectable()
export class UserRepository {
  constructor(private readonly orm: OrmClient) {}

  async create(userProps: UserCreateInput): Promise<UserResponse> {
    return this.orm.user.create({ data: userProps });
  }
}
