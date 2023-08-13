import { Test } from '@nestjs/testing';
import findByIdPrismaMock from 'prisma-mock';
import { FavoriteResponse } from 'src/entity/favorite.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { FavoriteRepository } from './repository';

let repository: FavoriteRepository;
let ormMock: OrmClient;

const findResult: FavoriteResponse = {
  id: 1234567890,
  userId: 'user-cuid',
  recipeId: 'recipe-cuid',
  createdAt: new Date(),
};

beforeAll(async () => {
  ormMock = findByIdPrismaMock();

  const loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      FavoriteRepository,
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

  repository = moduleRef.get<FavoriteRepository>(FavoriteRepository);

  // Mock favorite.findFirst method
  ormMock.favorite.findFirst = jest.fn().mockImplementation((props) => {
    // If the favorite with the given ID exists, return the findById favorite
    if (
      props.where.recipeId === findResult.recipeId &&
      props.where.userId === findResult.userId
    ) {
      return Promise.resolve(findResult);
    }

    // If the favorite does not exist, return null
    return Promise.resolve(null);
  });
});

describe('FavoriteRepository.findById()', () => {
  const ormProps = {
    where: { recipeId: findResult.recipeId, userId: findResult.userId },
  };

  test('Find favorite', async () => {
    // Exercise: call the function
    const favorite = await repository.findById(
      findResult.recipeId,
      findResult.userId,
    );

    // Verify: ensure favorite.findById was called with correct arguments
    expect(ormMock.favorite.findFirst).toHaveBeenCalledWith({
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(favorite?.id).toStrictEqual(findResult.id);
    expect(favorite?.recipeId).toStrictEqual(findResult.recipeId);
    expect(favorite?.userId).toStrictEqual(findResult.userId);
    expect(favorite?.createdAt).toStrictEqual(findResult.createdAt);
  });
});
