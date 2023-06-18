import { Test } from '@nestjs/testing';
import updatePrismaMock from 'prisma-mock';
import {
  UserProfileResponse,
  UserProfileUpdateInput,
} from 'src/entity/user-profile.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserProfileRepository } from './repository';

let repository: UserProfileRepository;
let ormMock: OrmClient;

const updateResult: UserProfileResponse = {
  userId: 'cuid',
  nickname: 'initial nickname',
  imgPath: 'initial/img/path',
  introduction: 'initial introduction',
  twitterId: 'initial_twitter_id',
  instagramId: 'initial_instagram_id',
  siteUrl: 'https://initial.com',
  followerCount: 0,
  recipeCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(async () => {
  ormMock = updatePrismaMock();

  const loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      UserProfileRepository,
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

  repository = moduleRef.get<UserProfileRepository>(UserProfileRepository);

  // Mock user.update method
  ormMock.userProfile.update = jest.fn().mockImplementation((updateProps) => {
    // If the user with the given ID exists, return the updated user
    if (updateProps.where.userId === updateResult.userId) {
      return Promise.resolve({
        ...updateResult,
        ...updateProps.data,
      });
    }

    // If the user does not exist, return null
    return Promise.resolve(null);
  });
});

describe('UserProfileRepository.update()', () => {
  test('Update user profile with non-string id', async () => {
    // Exercise: call the function
    const userProfileProps: UserProfileUpdateInput = {
      userId: undefined,
      nickname: 'test nickname',
      imgPath: 'test/img/path',
      introduction: 'test introduction',
      twitterId: 'test_twitter_id',
      instagramId: 'test_instagram_id',
      siteUrl: 'https://test.com',
      followerCount: 1,
      recipeCount: 1,
    };
    const userProfileProfile = repository.update(userProfileProps);
    await expect(userProfileProfile).rejects.toThrowError(
      new InvalidArgsError('user id must be a string'),
    );
  });

  test('Update user profile with non-existent id', async () => {
    // Exercise: call the function
    const userProfileProps: UserProfileUpdateInput = {
      userId: 'non-existent-id',
      nickname: 'test nickname2',
      imgPath: 'test/img/path2',
      introduction: 'test introduction2',
      twitterId: 'test_twitter_id2',
      instagramId: 'test_instagram_id2',
      siteUrl: 'https://test.com2',
      followerCount: 1234,
      recipeCount: 4321,
    };
    const userProfile = await repository.update(userProfileProps);

    // Verify: ensure the function returns the data we specified
    expect(userProfile).toBeNull();
  });

  test('Update user profile', async () => {
    // Exercise: call the function
    const userProfileProps: UserProfileUpdateInput = {
      userId: updateResult.userId,
      nickname: 'test nickname',
      imgPath: 'test/img/path',
      introduction: 'test introduction',
      twitterId: 'test_twitter_id',
      instagramId: 'test_instagram_id',
      siteUrl: 'https://test.com',
      followerCount: 1,
      recipeCount: 1,
    };
    const userProfile = await repository.update(userProfileProps);

    // Verify: ensure user.update was called with correct arguments
    expect(ormMock.userProfile.update).toHaveBeenCalledWith({
      where: { userId: userProfileProps.userId },
      data: userProfileProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(userProfile?.userId).toStrictEqual(userProfileProps.userId);
    expect(userProfile?.nickname).toStrictEqual(userProfileProps.nickname);
    expect(userProfile?.imgPath).toStrictEqual(userProfileProps.imgPath);
    expect(userProfile?.introduction).toStrictEqual(
      userProfileProps.introduction,
    );
    expect(userProfile?.twitterId).toStrictEqual(userProfileProps.twitterId);
    expect(userProfile?.instagramId).toStrictEqual(
      userProfileProps.instagramId,
    );
    expect(userProfile?.siteUrl).toStrictEqual(userProfileProps.siteUrl);
    expect(userProfile?.followerCount).toStrictEqual(
      userProfileProps.followerCount,
    );
    expect(userProfile?.recipeCount).toStrictEqual(
      userProfileProps.recipeCount,
    );
  });
});
