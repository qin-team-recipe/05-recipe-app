import { Test } from '@nestjs/testing';
import findByIdPrismaMock from 'prisma-mock';
import { FindManyShoppingMemoResponse } from 'src/entity/shopping-memo.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { ShoppingMemoRepository } from './repository';

let repository: ShoppingMemoRepository;
let ormMock: OrmClient;

const findResults: FindManyShoppingMemoResponse = [
  {
    id: '1234567890',
    userId: 'expect-found',
    name: 'shoppingMemo-1',
    boughtFlag: false,
    createdAt: new Date(),
  },
  {
    id: '9876543210',
    userId: 'expect-not-found',
    name: 'shoppingMemo-2',
    boughtFlag: false,
    createdAt: new Date(),
  },
];
beforeAll(async () => {
  ormMock = findByIdPrismaMock();

  const loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      ShoppingMemoRepository,
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

  repository = moduleRef.get<ShoppingMemoRepository>(ShoppingMemoRepository);
});

describe('ShoppingMemoRepository.findMany()', () => {
  const commonProps = {
    where: { userId: 'expect-found' },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      userId: true,
      name: true,
      boughtFlag: true,
      createdAt: true,
    },
  };

  describe('when the shoppingMemos does not exist', () => {
    beforeAll(async () => {
      // Mock shoppingMemo.findMany method
      ormMock.shoppingMemo.findMany = jest.fn().mockImplementation(() => {
        // If the shoppingMemo does not exist, return empty array
        return Promise.resolve([]);
      });
    });
    test('0 shoppingMemos', async () => {
      // Exercise: call the function
      const shoppingMemo = await repository.findMany(commonProps.where.userId);

      // Verify: ensure shoppingMemo.findMany was called with correct arguments
      expect(ormMock.shoppingMemo.findMany).toHaveBeenCalledWith(commonProps);

      // Verify: ensure the function returns the data we specified
      expect(shoppingMemo).toStrictEqual([]);
    });
  });
  describe('when the shoppingMemo exists', () => {
    beforeAll(async () => {
      // Mock shoppingMemo.findMany method
      ormMock.shoppingMemo.findMany = jest
        .fn()
        .mockImplementation(({ where: { userId } }) => {
          const searched = findResults.filter(
            (shoppingMemo) => shoppingMemo.userId === userId,
          );
          // If the shoppingMemo exist, return
          return Promise.resolve(searched);
        });
    });

    test('1 or more shoppingMemos', async () => {
      const userId = 'expect-found';
      const searched = findResults.filter(
        (shoppingMemo) => shoppingMemo.userId === userId,
      ); // Exercise: call the function
      const shoppingMemos = await repository.findMany(commonProps.where.userId);
      // Verify: ensure shoppingMemo.findMany was called with correct arguments
      expect(ormMock.shoppingMemo.findMany).toHaveBeenCalledWith(commonProps);

      // Verify: ensure the function returns the data we specified
      expect(shoppingMemos).toStrictEqual(searched);

      expect(shoppingMemos.length).toStrictEqual(searched.length);
    });
  });
});
