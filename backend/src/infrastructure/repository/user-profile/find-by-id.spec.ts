import { Test } from '@nestjs/testing';
import findByIdPrismaMock from 'prisma-mock';
import { FindUserProfileResponse } from 'src/entity/user-profile.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserProfileRepository } from './repository';

let repository: UserProfileRepository;
let ormMock: OrmClient;

const findResult: FindUserProfileResponse = {
  userId: 'cuid',
  nickname: 'user nickname',
  imgPath: 'user imgPath',
  introduction: 'user introduction',
  twitterId: 'user twitterId',
  instagramId: 'user instagramId',
  siteUrl: 'user siteUrl',
  followerCount: 1,
  recipeCount: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  recipes: [
    {
      id: 'recipe-cuid1',
      title: 'recipe-title1',
      description: 'recipe-description1',
      favoriteCount: 1,
    },
    {
      id: 'recipe-cuid2',
      title: 'recipe-title2',
      description: 'recipe-description2',
      favoriteCount: 2,
    },
  ],
};

beforeAll(async () => {
  ormMock = findByIdPrismaMock();

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

  // Mock user.findUnique method
  ormMock.userProfile.findUnique = jest.fn().mockImplementation((props) => {
    // If the user with the given ID exists, return the findById user
    if (props.where.userId === findResult.userId) {
      return Promise.resolve(findResult);
    }

    // If the user does not exist, return null
    return Promise.resolve(null);
  });
});

describe('UserProfileRepository.findByUserId()', () => {
  const ormProps = {
    include: {
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          favoriteCount: true,
        },
      },
    },
  };

  test('Find user profile with non-existent id', async () => {
    const userId = 'non-existent-id';
    // Exercise: call the function
    const userProfile = await repository.findByUserId(userId);

    // Verify: ensure user.findById was called with correct arguments
    expect(ormMock.userProfile.findUnique).toHaveBeenCalledWith({
      where: { userId },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(userProfile).toBeNull();
  });

  test('Find user profile', async () => {
    // Exercise: call the function
    const userProfile = await repository.findByUserId(findResult.userId);

    // Verify: ensure user.findById was called with correct arguments
    expect(ormMock.userProfile.findUnique).toHaveBeenCalledWith({
      where: { userId: findResult.userId },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(userProfile?.userId).toStrictEqual(findResult.userId);
    expect(userProfile?.userId).toStrictEqual(findResult.userId);
    expect(userProfile?.nickname).toStrictEqual(findResult.nickname);
    expect(userProfile?.imgPath).toStrictEqual(findResult.imgPath);
    expect(userProfile?.introduction).toStrictEqual(findResult.introduction);
    expect(userProfile?.twitterId).toStrictEqual(findResult.twitterId);
    expect(userProfile?.instagramId).toStrictEqual(findResult.instagramId);
    expect(userProfile?.siteUrl).toStrictEqual(findResult.siteUrl);
    expect(userProfile?.followerCount).toStrictEqual(findResult.followerCount);
    expect(userProfile?.recipeCount).toStrictEqual(findResult.recipeCount);
    expect(userProfile?.recipes).toStrictEqual(findResult.recipes);
  });
});
