import { Test } from '@nestjs/testing';
import updatePrismaMock from 'prisma-mock';
import { UserUpdateInput } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserRepository } from './repository';

let repository: UserRepository;
let ormMock: OrmClient;

const updateResult = {
  id: 'cuid',
  email: 'initial@test.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  ormMock = updatePrismaMock();

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

  // Mock user.update method
  ormMock.user.update = jest.fn().mockImplementation((updateProps) => {
    // If the user with the given ID exists, return the updated user
    if (updateProps.where.id === updateResult.id) {
      return Promise.resolve({
        ...updateResult,
        ...updateProps.data,
      });
    }

    // If the user does not exist, return null
    return Promise.resolve(null);
  });
});

describe('UserRepository.update()', () => {
  test('Update user with non-string id', async () => {
    // Exercise: call the function
    const userProps: UserUpdateInput = {
      id: undefined,
      email: 'test@test.com',
    };
    const user = repository.update(userProps);
    await expect(user).rejects.toThrowError(
      new InvalidArgsError('id must be a string'),
    );
  });

  test('Update user with non-existent id', async () => {
    // Exercise: call the function
    const userProps: UserUpdateInput = {
      id: 'non-existent-id',
      email: 'test@test.com',
    };
    const user = await repository.update(userProps);

    // Verify: ensure the function returns the data we specified
    expect(user).toBeNull();
  });

  test('Update user', async () => {
    // Exercise: call the function
    const userProps: UserUpdateInput = {
      id: updateResult.id,
      email: 'test@test.com',
    };
    const user = await repository.update(userProps);

    // Verify: ensure user.update was called with correct arguments
    expect(ormMock.user.update).toHaveBeenCalledWith({
      where: { id: userProps.id },
      data: userProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user?.id).toStrictEqual(userProps.id);
    expect(user?.email).toStrictEqual(userProps.email);
  });
});
