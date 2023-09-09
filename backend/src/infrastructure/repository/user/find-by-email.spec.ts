import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { UserWithAuthProvidersResponse } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserRepository } from './repository';

let repository: UserRepository;
let ormMock: OrmClient;

const findResult: UserWithAuthProvidersResponse = {
  id: 'cuid',
  email: 'initial@test.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  userAuthProviders: [{ provider: 'GOOGLE', providerId: '1234567890' }],
};

beforeAll(async () => {
  ormMock = createPrismaMock();

  const loggerMock = {
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

  // Mock user.findUnique method
  ormMock.user.findUnique = jest.fn().mockImplementation((props) => {
    // If the user with the given ID exists, return the findByEmail user
    if (props.where.email === findResult.email) {
      return Promise.resolve(findResult);
    }

    // If the user does not exist, return null
    return Promise.resolve(null);
  });
});

describe('UserRepository.findByEmail()', () => {
  const ormProps = {
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

  test('Find user with non-existent id', async () => {
    const email = 'non-existent-email@test.com';
    // Exercise: call the function
    const user = await repository.findByEmail(email);

    // Verify: ensure user.findByEmail was called with correct arguments
    expect(ormMock.user.findUnique).toHaveBeenCalledWith({
      where: { email },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user).toBeNull();
  });

  test('Find user', async () => {
    // Exercise: call the function
    const user = await repository.findByEmail(findResult.email);

    // Verify: ensure user.findByEmail was called with correct arguments
    expect(ormMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: findResult.email },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user).toStrictEqual(findResult);
  });
});
