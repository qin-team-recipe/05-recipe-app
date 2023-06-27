import { Test } from '@nestjs/testing';
import paginatePrismaMock from 'prisma-mock';
import { PaginateUserProfileResponse } from 'src/entity/user-profile.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { UserProfileRepository } from './repository';

let repository: UserProfileRepository;
let ormMock: OrmClient;

const paginateResults: PaginateUserProfileResponse = [];
for (let i = 1; i <= 11; i++) {
  paginateResults.push({
    userId: 'cuid' + i,
    nickname: 'nickname' + i,
    imgPath: 'test/imgPath' + i,
    introduction: 'introduction' + i,
    recipeCount: i,
  });
}

beforeAll(async () => {
  ormMock = paginatePrismaMock();

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
});

describe('UserProfileRepository.paginate()', () => {
  const commonOrmProps = {
    take: 5,
    orderBy: {
      nickname: 'asc',
    },
    select: {
      userId: true,
      nickname: true,
      imgPath: true,
      introduction: true,
      recipeCount: true,
    },
  };
  describe('when the user profile does not exist', () => {
    beforeAll(async () => {
      // Mock user.findMany method
      ormMock.userProfile.findMany = jest.fn().mockImplementation(() => {
        // If the user does not exist, return empty array
        return Promise.resolve([]);
      });
    });
    test('0 user profiles', async () => {
      const ormProps = {
        ...commonOrmProps,
        cursor: undefined,
      };
      // Exercise: call the function
      const userProfiles = await repository.paginate(ormProps.take);

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.userProfile.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(userProfiles).toStrictEqual([]);
    });
  });

  describe('when the user exists', () => {
    const findIndexByUserId = (userId: string): number => {
      return paginateResults.findIndex(
        (userProfile) => userProfile.userId === userId,
      );
    };

    beforeAll(async () => {
      // Mock user.findMany method
      ormMock.userProfile.findMany = jest
        .fn()
        .mockImplementation(({ take, cursor = {} }) => {
          const { userId } = cursor;
          const start = userId ? findIndexByUserId(userId) + 1 : 0;
          const end = start + take;
          const results = paginateResults.slice(start, end);
          return Promise.resolve(results);
        });
    });
    test('UserProfiles on page 1', async () => {
      const ormProps = {
        ...commonOrmProps,
      };
      // Exercise: call the function
      const userProfiles = await repository.paginate(ormProps.take);

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.userProfile.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(userProfiles).toStrictEqual(
        paginateResults.slice(0, ormProps.take),
      );
      expect(userProfiles.length).toStrictEqual(ormProps.take);
    });
    test('UserProfiles on page 2', async () => {
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { userId: paginateResults[commonOrmProps.take - 1].userId },
      };
      const {
        take,
        cursor: { userId },
      } = ormProps;

      // Exercise: call the function
      const userProfiles = await repository.paginate(take, userId);

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.userProfile.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByUserId(userId) + 1;
      const end = start + take;
      expect(userProfiles).toStrictEqual(paginateResults.slice(start, end));
      expect(userProfiles.length).toStrictEqual(take);
    });
    test('UserProfiles on page 3', async () => {
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { userId: paginateResults[commonOrmProps.take * 2 - 1].userId },
      };
      const {
        take,
        cursor: { userId },
      } = ormProps;

      // Exercise: call the function
      const userProfiles = await repository.paginate(take, userId);

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.userProfile.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByUserId(userId) + 1;
      const end = start + take;
      expect(userProfiles).toStrictEqual(paginateResults.slice(start, end));
      expect(userProfiles.length).toStrictEqual(1);
    });
  });
});
