import { Prisma, User } from '@prisma/client';
import { OrmClient } from 'src/infrastructure/orm/orm.client';

export type CreateUserProps = Prisma.UserCreateInput;
export type CreateUserResult = User;

export class UserRepository {
  constructor(private readonly orm: OrmClient) {}
  async create(userProps: CreateUserProps): Promise<CreateUserResult> {
    return this.orm.user.create({ data: userProps });
  }
}
