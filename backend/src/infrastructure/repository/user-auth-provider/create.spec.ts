import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { UserAuthProviderCreateInput } from 'src/entity/user-auth-provider.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserAuthProviderRepository } from './repository';

let repository: UserAuthProviderRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

beforeEach(async () => {
  ormMock = createPrismaMock();

  loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      UserAuthProviderRepository,
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

  repository = moduleRef.get<UserAuthProviderRepository>(
    UserAuthProviderRepository,
  );
});

describe('UserAuthProviderRepository.create()', () => {
  test('Create google auth provider', async () => {
    // Exercise: call the function
    const userAuthProviderProps: UserAuthProviderCreateInput = {
      userId: 'cuid',
      provider: 'GOOGLE',
      providerId: '1234567890',
    };
    const userAuthProvider = await repository.create(userAuthProviderProps);

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.userAuthProvider.create).toHaveBeenCalledWith({
      data: userAuthProviderProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(userAuthProvider.userId).toStrictEqual(userAuthProviderProps.userId);
  });

  test('Create apple auth provider', async () => {
    // Exercise: call the function
    const userAuthProviderProps: UserAuthProviderCreateInput = {
      userId: 'cuid2',
      provider: 'APPLE',
      providerId: 'abcdefghijk',
    };
    const userAuthProvider = await repository.create(userAuthProviderProps);

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.userAuthProvider.create).toHaveBeenCalledWith({
      data: userAuthProviderProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(userAuthProvider.userId).toStrictEqual(userAuthProviderProps.userId);
  });
});
