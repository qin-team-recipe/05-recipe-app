import { Injectable } from '@nestjs/common';
import { UserCreateInput, UserResponse } from 'src/entity/user.entity';
import { UserRepository } from 'src/infrastructure/repository/user/repository';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async create(userProps: UserCreateInput): Promise<UserResponse> {
    return this.userRepository.createWithAuthProvider(userProps);
  }
}
