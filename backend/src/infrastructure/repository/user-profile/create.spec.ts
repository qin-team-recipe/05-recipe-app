import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { UserProfileCreateInput } from 'src/entity/user-profile.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserProfileRepository } from './repository';

let repository: UserProfileRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

beforeEach(async () => {
  ormMock = createPrismaMock();

  loggerMock = {
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
});

describe('UserProfileRepository.create()', () => {
  test('Create user profile with all values', async () => {
    // Exercise: call the function
    const userProfileProps: UserProfileCreateInput = {
      userId: 'cuid',
      nickname: 'test nickname',
      imgPath: 'test/img/path',
      introduction: 'test introduction',
      followerCount: 1,
      recipeCount: 1,
      userLinks: [
        {
          url: 'test-url1',
        },
      ],
    };
    const userProfile = await repository.create(userProfileProps);

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.userProfile.create).toHaveBeenCalledWith({
      data: {
        ...userProfileProps,
        userLinks: {
          createMany: {
            data: userProfileProps.userLinks,
          },
        },
      },
      include: {
        userLinks: true,
      },
    });

    // Verify: ensure the function returns the data we specified
    expect(userProfile.userId).toStrictEqual(userProfileProps.userId);
    expect(userProfile.nickname).toStrictEqual(userProfileProps.nickname);
    expect(userProfile.imgPath).toStrictEqual(userProfileProps.imgPath);
    expect(userProfile.introduction).toStrictEqual(
      userProfileProps.introduction,
    );
    expect(userProfile.followerCount).toStrictEqual(
      userProfileProps.followerCount,
    );
    expect(userProfile.recipeCount).toStrictEqual(userProfileProps.recipeCount);
  });

  test('Create user profile without optional values', async () => {
    // Exercise: call the function
    const userProfilePropsWithoutOptional: UserProfileCreateInput = {
      userId: 'cuid',
      nickname: 'test nickname',
      introduction: 'test introduction',
      followerCount: 0,
      recipeCount: 0,
      userLinks: [
        {
          url: 'test-url1',
        },
      ],
    };
    const userProfile = await repository.create(
      userProfilePropsWithoutOptional,
    );

    // Verify: ensure user.create was called with correct arguments
    expect(ormMock.userProfile.create).toHaveBeenCalledWith({
      data: {
        ...userProfilePropsWithoutOptional,
        userLinks: {
          createMany: {
            data: userProfilePropsWithoutOptional.userLinks,
          },
        },
      },
      include: {
        userLinks: true,
      },
    });

    // Verify: ensure the function returns the data we specified
    expect(userProfile.userId).toStrictEqual(
      userProfilePropsWithoutOptional.userId,
    );
    expect(userProfile.nickname).toStrictEqual(
      userProfilePropsWithoutOptional.nickname,
    );
    expect(userProfile.introduction).toStrictEqual(
      userProfilePropsWithoutOptional.introduction,
    );
    expect(userProfile.followerCount).toStrictEqual(
      userProfilePropsWithoutOptional.followerCount,
    );
    expect(userProfile.recipeCount).toStrictEqual(
      userProfilePropsWithoutOptional.recipeCount,
    );
  });
});
