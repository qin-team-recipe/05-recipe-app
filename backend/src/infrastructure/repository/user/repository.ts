import { UserCreateInput, UserResponse } from 'src/entities/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';

export class UserRepository {
  constructor(private readonly orm: OrmClient) {}

  async create(userProps: UserCreateInput): Promise<UserResponse> {
    return this.orm.user.create({ data: userProps });
  }
}
