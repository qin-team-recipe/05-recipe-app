import { Test } from '@nestjs/testing';
import paginatePrismaMock from 'prisma-mock';
import { CustomLoggerService } from 'src/common/logger/custom-logger.service';
import { PaginateUserResponse } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { UserRepository } from './repository';

let repository: UserRepository;
let ormMock: OrmClient;

const paginateResults: PaginateUserResponse = [];
for (let i = 1; i <= 11; i++) {
  paginateResults.push({
    id: 'cuid' + i,
    email: 'user' + i + '@test.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    userProfile: {
      nickname: 'user nickname' + i,
      imgPath: 'user imgPath' + i,
      introduction: 'user introduction' + i,
      recipeCount: i,
    },
  });
}

beforeAll(async () => {
  ormMock = paginatePrismaMock();

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
});

describe('UserRepository.paginate()', () => {
  describe('when the user does not exist', () => {
    beforeAll(async () => {
      // Mock user.findMany method
      ormMock.user.findMany = jest.fn().mockImplementation(() => {
        // If the user does not exist, return empty array
        return Promise.resolve([]);
      });
    });
    test('0 users', async () => {
      const ormProps = {
        include: {
          userProfile: {
            select: {
              nickname: true,
              imgPath: true,
              introduction: true,
              recipeCount: true,
            },
          },
        },
      };
      // Exercise: call the function
      const users = await repository.paginate();

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.user.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(users).toStrictEqual([]);
    });
  });

  describe('when the user exists', () => {
    const perPage = 5;
    beforeAll(async () => {
      // Mock user.findMany method
      ormMock.user.findMany = jest.fn().mockImplementation((props) => {
        const start = props.skip;
        const end = start + props.take;
        const results = paginateResults.slice(start, end);
        return Promise.resolve(results);
      });
    });
    test('Users on page 1', async () => {
      const page = 1;
      const ormProps = {
        skip: perPage * (page - 1),
        take: perPage,
        include: {
          userProfile: {
            select: {
              nickname: true,
              imgPath: true,
              introduction: true,
              recipeCount: true,
            },
          },
        },
      };
      // Exercise: call the function
      const users = await repository.paginate(page, perPage);

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.user.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = perPage * (page - 1);
      const end = start + perPage;
      expect(users).toStrictEqual(paginateResults.slice(start, end));
      expect(users.length).toStrictEqual(perPage);
    });
    test('Users on page 2', async () => {
      const page = 2;
      const ormProps = {
        skip: perPage * (page - 1),
        take: perPage,
        include: {
          userProfile: {
            select: {
              nickname: true,
              imgPath: true,
              introduction: true,
              recipeCount: true,
            },
          },
        },
      };
      // Exercise: call the function
      const users = await repository.paginate(page, perPage);

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.user.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = perPage * (page - 1);
      const end = start + perPage;
      expect(users).toStrictEqual(paginateResults.slice(start, end));
      expect(users.length).toStrictEqual(perPage);
    });
    test('Users on page 3', async () => {
      const page = 3;
      const ormProps = {
        skip: perPage * (page - 1),
        take: perPage,
        include: {
          userProfile: {
            select: {
              nickname: true,
              imgPath: true,
              introduction: true,
              recipeCount: true,
            },
          },
        },
      };
      // Exercise: call the function
      const users = await repository.paginate(page, perPage);

      // Verify: ensure user.paginate was called with correct arguments
      expect(ormMock.user.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = perPage * (page - 1);
      const end = start + perPage;
      expect(users).toStrictEqual(paginateResults.slice(start, end));
      expect(users.length).toStrictEqual(1);
    });
  });
});
