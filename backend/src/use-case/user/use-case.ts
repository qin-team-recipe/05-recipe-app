import { Injectable } from '@nestjs/common';
import {
  UserCreateInput,
  UserWithAuthProvidersResponse,
} from 'src/entity/user.entity';
import { UserAuthProviderRepository } from 'src/infrastructure/repository/user-auth-provider/repository';
import { UserRepository } from 'src/infrastructure/repository/user/repository';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: UserAuthProviderRepository,
  ) {}

  // 認証プロバイダーの登録
  async registerAuthProvider(
    userProps: UserCreateInput,
  ): Promise<UserWithAuthProvidersResponse> {
    const user = await this.userRepository.findByEmail(userProps.email);

    if (!user) {
      return await this.userRepository.createWithAuthProvider(userProps);
    }

    const hasRequestAuthProvider = user.userAuthProviders.some(
      (provider) => provider.provider === userProps.provider,
    );

    if (!hasRequestAuthProvider) {
      const userAuth = await this.authRepository.create({
        userId: user.id,
        provider: userProps.provider,
        providerId: userProps.providerId,
      });

      return {
        ...user,
        userAuthProviders: [...user.userAuthProviders, userAuth],
      };
    }

    return user;
  }
}
