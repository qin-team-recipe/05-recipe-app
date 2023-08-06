import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { FavoriteCreateInput } from 'src/entity/favorite.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { FavoriteRepository } from './repository';

let repository: FavoriteRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

beforeAll(async () => {
  ormMock = createPrismaMock();

  loggerMock = {
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
});

describe('FavoriteRepository.create()', () => {
  test('Create favorite with all values', async () => {
    // Exercise: call the function
    const favoriteProps: FavoriteCreateInput = {
      id: 1234567890,
      userId: 'user-cuid',
      recipeId: 'recipe-cuid',
      createdAt: new Date(),
    };

    const favorite = await repository.create(favoriteProps);

    // Verify: ensure favorite.create was called with correct arguments
    expect(ormMock.favorite.create).toHaveBeenCalledWith({
      data: favoriteProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(favorite.id).toStrictEqual(favoriteProps.id);
    expect(favorite.userId).toStrictEqual(favoriteProps.userId);
    expect(favorite.recipeId).toStrictEqual(favoriteProps.recipeId);
    expect(favorite.createdAt).toStrictEqual(favoriteProps.createdAt);
  });
});
