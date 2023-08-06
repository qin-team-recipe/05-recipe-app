import { Test } from '@nestjs/testing';
import findByIdPrismaMock from 'prisma-mock';
import { FindUserResponse } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserRepository } from './repository';

let repository: UserRepository;
let ormMock: OrmClient;

const findResult: FindUserResponse = {
  id: 'cuid',
  email: 'initial@test.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  userProfile: {
    nickname: 'user nickname',
    imgPath: 'user imgPath',
    introduction: 'user introduction',
    twitterId: 'user twitterId',
    instagramId: 'user instagramId',
    siteUrl: 'user siteUrl',
    followerCount: 1,
    recipeCount: 1,
  },
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
    // If the user with the given ID exists, return the findById user
    if (props.where.id === findResult.id) {
      return Promise.resolve(findResult);
    }

    // If the user does not exist, return null
    return Promise.resolve(null);
  });
});

describe('UserRepository.findById()', () => {
  const ormProps = {
    include: {
      userProfile: {
        select: {
          nickname: true,
          imgPath: true,
          introduction: true,
          twitterId: true,
          instagramId: true,
          siteUrl: true,
          followerCount: true,
          recipeCount: true,
        },
      },
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

  test('Find user with non-existent id', async () => {
    const id = 'non-existent-id';
    // Exercise: call the function
    const user = await repository.findById(id);

    // Verify: ensure user.findById was called with correct arguments
    expect(ormMock.user.findUnique).toHaveBeenCalledWith({
      where: { id },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user).toBeNull();
  });

  test('Find user', async () => {
    // Exercise: call the function
    const user = await repository.findById(findResult.id);

    // Verify: ensure user.findById was called with correct arguments
    expect(ormMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: findResult.id },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user?.id).toStrictEqual(findResult.id);
    expect(user?.email).toStrictEqual(findResult.email);
    expect(user?.userProfile).toStrictEqual(findResult.userProfile);
    expect(user?.recipes).toStrictEqual(findResult.recipes);
  });
});
