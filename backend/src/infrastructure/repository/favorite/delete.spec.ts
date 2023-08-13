import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { FavoriteResponse } from 'src/entity/favorite.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { FavoriteRepository } from 'src/infrastructure/repository/favorite/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let repository: FavoriteRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

const currentFavorites: FavoriteResponse[] = [];
for (let i = 1; i <= 5; i++) {
  currentFavorites.push({
    id: i,
    userId: 'user-cuid',
    recipeId: 'recipe-cuid',
    createdAt: new Date(),
  });
}
let deleteFavoriteResults: FavoriteResponse[] = [];

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

  // Mock favorite.delete method
  ormMock.favorite.delete = jest.fn().mockImplementation((props) => {
    deleteFavoriteResults = currentFavorites.filter((favorite) => {
      return favorite.id !== props.where.id;
    });
  });
});

describe('FavoriteRepository.delete()', () => {
  test('Delete favorite', async () => {
    // Exercise: call the function
    const deleteFavoriteId = 1;
    await repository.delete(deleteFavoriteId);
    // Verify: ensure favorite.delete was called with correct arguments
    expect(ormMock.favorite.delete).toHaveBeenCalledWith({
      where: { id: deleteFavoriteId },
    });

    // Verify: ensure the function returns the data we specified
    expect(deleteFavoriteResults.length).toStrictEqual(
      currentFavorites.length - 1,
    );
  });
});
