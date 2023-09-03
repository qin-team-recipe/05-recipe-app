import { Test } from '@nestjs/testing';
import {
  UserCreateInput,
  UserWithAuthProvidersResponse,
} from 'src/entity/user.entity';
import { UserAuthProviderRepository } from 'src/infrastructure/repository/user-auth-provider/repository';
import { UserLinkRepository } from 'src/infrastructure/repository/user-link/repository';
import { UserProfileRepository } from 'src/infrastructure/repository/user-profile/repository';
import { UserRepository } from 'src/infrastructure/repository/user/repository';
import { UserUseCase } from './use-case';

let useCase: UserUseCase;
let userRepository: UserRepository;
let authRepository: UserAuthProviderRepository;

const response: UserWithAuthProvidersResponse = {
  id: 'cuid',
  email: 'initial@test.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  userAuthProviders: [
    {
      provider: 'GOOGLE',
      providerId: '1234567890',
    },
  ],
};

beforeEach(async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [
      UserUseCase,
      {
        provide: UserRepository,
        useValue: {
          findByEmail: jest.fn(),
          createWithAuthProvider: jest.fn(),
        },
      },
      {
        provide: UserAuthProviderRepository,
        useValue: {
          create: jest.fn(),
        },
      },
      {
        provide: UserProfileRepository,
        useValue: {},
      },
      {
        provide: UserLinkRepository,
        useValue: {},
      },
    ],
  }).compile();

  useCase = moduleRef.get<UserUseCase>(UserUseCase);
  userRepository = moduleRef.get<UserRepository>(UserRepository);
  authRepository = moduleRef.get<UserAuthProviderRepository>(
    UserAuthProviderRepository,
  );

  userRepository.findByEmail = jest.fn().mockImplementation((email) => {
    if (email === response.email) {
      return Promise.resolve(response);
    }

    return Promise.resolve(null);
  });

  userRepository.createWithAuthProvider = jest
    .fn()
    .mockImplementation(({ email, provider, providerId }) => {
      return Promise.resolve({
        id: 'created-user-id',
        email,
        userAuthProviders: [{ provider, providerId }],
      });
    });

  authRepository.create = jest
    .fn()
    .mockImplementation(({ provider, providerId }) => {
      return Promise.resolve({ provider, providerId });
    });
});

describe('UserUseCase.registerAuthProvider()', () => {
  test('Create user with google auth', async () => {
    // Exercise: call the function
    const userProps: UserCreateInput = {
      email: 'test@test.com',
      provider: 'GOOGLE',
      providerId: '1234567890',
    };
    const user = await useCase.registerAuthProvider(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userProps.email);
    expect(userRepository.createWithAuthProvider).toHaveBeenCalledWith({
      ...userProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.email).toStrictEqual(userProps.email);
    expect(user.userAuthProviders[0].provider).toStrictEqual(
      userProps.provider,
    );
    expect(user.userAuthProviders[0].providerId).toStrictEqual(
      userProps.providerId,
    );
  });

  test('Create user with apple auth', async () => {
    // Exercise: call the function
    const userProps: UserCreateInput = {
      email: 'test@test.com',
      provider: 'APPLE',
      providerId: 'abcdefghijk',
    };
    const user = await useCase.registerAuthProvider(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userProps.email);
    expect(userRepository.createWithAuthProvider).toHaveBeenCalledWith({
      ...userProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.email).toStrictEqual(userProps.email);
    expect(user.userAuthProviders[0].provider).toStrictEqual(
      userProps.provider,
    );
    expect(user.userAuthProviders[0].providerId).toStrictEqual(
      userProps.providerId,
    );
  });

  test('Add auth provider', async () => {
    // Exercise: call the function
    const userProps: UserCreateInput = {
      email: 'initial@test.com',
      provider: 'APPLE',
      providerId: '987654321',
    };
    const user = await useCase.registerAuthProvider(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userProps.email);

    // Verify: ensure the function returns the data we specified
    expect(user.id).toStrictEqual(response.id);
    expect(user.email).toStrictEqual(userProps.email);
    expect(user.userAuthProviders).toStrictEqual([
      ...response.userAuthProviders,
      { provider: userProps.provider, providerId: userProps.providerId },
    ]);
  });
});
