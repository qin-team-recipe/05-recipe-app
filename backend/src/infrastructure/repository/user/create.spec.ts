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

describe('UserRepository.create()', () => {
  test('Create user with all values', async () => {
    // Exercise: call the function
    const userProps: UserCreateInput = {
      email: 'test@test.com',
    };
    const user = await repository.create(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.user.create).toHaveBeenCalledWith({
      data: userProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.email).toStrictEqual(userProps.email);
  });

  test('Create user without optional values', async () => {
    // Exercise: call the function
    const userPropsWithoutOptional: UserCreateInput = {
      email: 'test@test.com',
    };
    const user = await repository.create(userPropsWithoutOptional);

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.user.create).toHaveBeenCalledWith({
      data: userPropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.email).toStrictEqual(userPropsWithoutOptional.email);
  });
});
