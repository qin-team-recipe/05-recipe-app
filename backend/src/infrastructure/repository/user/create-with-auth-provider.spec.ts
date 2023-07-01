import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { UserCreateInput } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserRepository } from './repository';

let repository: UserRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

beforeAll(async () => {
  ormMock = createPrismaMock();

  loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      UserRepository,
      {
        provide: OrmClient,
        useValue: ormMock,
      },
      {
        provide: CustomLoggerService,
        useValue: loggerMock,
      },
    ],
  }).compile();

  repository = moduleRef.get<UserRepository>(UserRepository);
});

describe('UserRepository.createWithAuthProvider()', () => {
  const commonOrmProps = {
    include: {
      userAuthProviders: {
        select: {
          userId: true,
          provider: true,
          providerId: true,
        },
      },
    },
  };
  test('Create user with google auth', async () => {
    // Exercise: call the function
    const userProps: UserCreateInput = {
      email: 'test@test.com',
      userAuthProviders: {
        create: {
          provider: 'GOOGLE',
          providerId: '1234567890',
        },
      },
    };
    const user = await repository.createWithAuthProvider(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.user.create).toHaveBeenCalledWith({
      data: userProps,
      ...commonOrmProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.email).toStrictEqual(userProps.email);
    expect(user.userAuthProviders[0].provider).toStrictEqual('GOOGLE');
    expect(user.userAuthProviders[0].providerId).toStrictEqual('1234567890');
  });

  test('Create user with apple auth', async () => {
    // Exercise: call the function
    const userProps: UserCreateInput = {
      email: 'test@test.com',
      userAuthProviders: {
        create: {
          provider: 'APPLE',
          providerId: 'abcdefghijk',
        },
      },
    };
    const user = await repository.createWithAuthProvider(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.user.create).toHaveBeenCalledWith({
      data: userProps,
      ...commonOrmProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.email).toStrictEqual(userProps.email);
    expect(user.userAuthProviders[0].provider).toStrictEqual('APPLE');
    expect(user.userAuthProviders[0].providerId).toStrictEqual('abcdefghijk');
  });
});
