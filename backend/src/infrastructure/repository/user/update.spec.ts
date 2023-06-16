import { Test } from '@nestjs/testing';
import updatePrismaMock from 'prisma-mock';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';
import { UserResponse, UserUpdateInput } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { UserRepository } from './repository';

let repository: UserRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;
let createdResult: UserResponse;
let createdUser: UserResponse;

beforeAll(async () => {
  ormMock = updatePrismaMock();

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

  // Create a test user and mock the user.create method
  const testUserProps = {
    email: 'initial@test.com',
    nickname: 'Initial User',
    imgPath: 'initial/path',
    introduction: 'initial introduction',
    twitterId: 'initial_twitter_id',
    instagramId: 'initial_instagram_id',
    siteUrl: 'https://initial_site_url.com',
  };

  createdResult = {
    id: 'cuid',
    ...testUserProps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  ormMock.user.create = jest.fn().mockResolvedValue(createdResult);
  createdUser = await repository.create(testUserProps);

  // Mock user.update method
  ormMock.user.update = jest.fn().mockImplementation((updateProps) => {
    // If the user with the given ID exists, return the updated user
    if (updateProps.where.id === createdResult.id) {
      return Promise.resolve({
        ...createdResult,
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
      nickname: 'John Doe',
      email: 'test@test.com',
      introduction: 'test introduction',
    };
    const user = repository.update(userProps);
    await expect(user).rejects.toThrowError(Error('id must be a string'));
  });

  test('Update user with non-existent id', async () => {
    // Exercise: call the function
    const userProps: UserUpdateInput = {
      id: 'non-existent-id',
      nickname: 'John Doe',
      email: 'test@test.com',
      introduction: 'test introduction',
    };
    const user = await repository.update(userProps);

    // Verify: ensure the function returns the data we specified
    expect(user).toBeNull();
  });

  test('Update user with all values', async () => {
    // Exercise: call the function
    const userProps: UserUpdateInput = {
      id: createdUser.id,
      email: 'test@test.com',
      nickname: 'John Doe',
      imgPath: 'test/path',
      introduction: 'test introduction',
      twitterId: 'test_twitter_id',
      instagramId: 'test_instagram_id',
      siteUrl: 'https://test_site_url.com',
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
    expect(user?.nickname).toStrictEqual(userProps.nickname);
    expect(user?.imgPath).toStrictEqual(userProps.imgPath);
    expect(user?.introduction).toStrictEqual(userProps.introduction);
    expect(user?.twitterId).toStrictEqual(userProps.twitterId);
    expect(user?.instagramId).toStrictEqual(userProps.instagramId);
    expect(user?.siteUrl).toStrictEqual(userProps.siteUrl);
  });

  test('Update user without optional values', async () => {
    // Exercise: call the function
    const userPropsWithoutOptional: UserUpdateInput = {
      id: createdUser.id,
      nickname: 'John Doe',
      email: 'test@test.com',
      introduction: 'test introduction',
    };
    const user = await repository.update(userPropsWithoutOptional);

    // Verify: ensure user.update was called with correct arguments
    expect(ormMock.user.update).toHaveBeenCalledWith({
      where: { id: userPropsWithoutOptional.id },
      data: userPropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(user?.id).toStrictEqual(userPropsWithoutOptional.id);
    expect(user?.email).toStrictEqual(userPropsWithoutOptional.email);
    expect(user?.nickname).toStrictEqual(userPropsWithoutOptional.nickname);
    expect(user?.introduction).toStrictEqual(
      userPropsWithoutOptional.introduction,
    );
    expect(user?.imgPath).toStrictEqual(createdUser.imgPath);
    expect(user?.twitterId).toStrictEqual(createdUser.twitterId);
    expect(user?.instagramId).toStrictEqual(createdUser.instagramId);
    expect(user?.siteUrl).toStrictEqual(createdUser.siteUrl);
  });
});
