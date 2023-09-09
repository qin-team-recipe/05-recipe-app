import { Test } from '@nestjs/testing';
import paginatePrismaMock from 'prisma-mock';
import { PickupListRecipeResponse } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { RecipeRepository } from 'src/infrastructure/repository/recipe/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let repository: RecipeRepository;
let ormMock: OrmClient;

const pickupListResults: PickupListRecipeResponse = [];
const pickupListResultsNum = 12;
const toDateNum = 3;

for (let i = 1; i <= pickupListResultsNum; i++) {
  const resultsFavoriteDate: Date = new Date();
  let daysAgo: number;
  // 直近3日のデータ11件と4日前のデータを作成する処理
  if (i <= 4) daysAgo = 0;
  else if (i <= 8) daysAgo = 1;
  else if (i <= 11) daysAgo = 2;
  else daysAgo = 3;
  resultsFavoriteDate.setDate(resultsFavoriteDate.getDate() - daysAgo);

  pickupListResults.push({
    id: 'cuid' + i,
    title: 'test title' + i,
    description: 'test description' + i,
    favoriteCount: i,
    recipeImages: [
      {
        path: 'test/img/path' + i,
      },
    ],
    favorites: [
      {
        createdAt: resultsFavoriteDate,
      },
    ],
  });
}

beforeAll(async () => {
  ormMock = paginatePrismaMock();

  const loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      RecipeRepository,
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

  repository = moduleRef.get<RecipeRepository>(RecipeRepository);
});

describe('RecipeRepository.pickupList()', () => {
  const fromDate = new Date();
  const toDate = new Date();
  toDate.setDate(toDate.getDate() - toDateNum);

  const commonOrmProps = {
    take: 5,
    where: {
      favorites: {
        every: {
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
      },
    },
    orderBy: {
      favoriteCount: 'desc',
    },
    select: {
      id: true,
      title: true,
      description: true,
      favoriteCount: true,
      recipeImages: {
        select: {
          path: true,
        },
      },
      favorites: {
        select: {
          createdAt: true,
        },
      },
    },
  };
  describe('when the recipe does not exist', () => {
    beforeAll(async () => {
      // Mock recipe.findMany method
      ormMock.recipe.findMany = jest.fn().mockImplementation(() => {
        // If the recipe does not exist, return empty array
        return Promise.resolve([]);
      });
    });
    test('0 recipes', async () => {
      const ormProps = {
        ...commonOrmProps,
        where: {
          favorites: {
            every: {
              createdAt: {
                gte: undefined,
                lte: undefined,
              },
            },
          },
        },
        cursor: undefined,
      };
      // Exercise: call the function
      const recipes = await repository.pickupList(ormProps.take);

      // Verify: ensure recipe.pickupList was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(recipes).toStrictEqual([]);
    });
  });

  describe('when the recipe exists', () => {
    const findIndexByRecipeId = (id: string): number => {
      return pickupListResults.findIndex((recipe) => recipe.id === id);
    };
    beforeAll(async () => {
      // Mock recipe.findMany method
      ormMock.recipe.findMany = jest
        .fn()
        .mockImplementation(({ where: { favorites }, take, cursor = {} }) => {
          const filterDateResults = pickupListResults.map((res) => {
            return {
              ...res,
              favorites: res.favorites.filter(
                (favorite) =>
                  favorite.createdAt <= favorites.every.createdAt.gte &&
                  favorite.createdAt >= favorites.every.createdAt.lte,
              ),
            };
          });
          const filterResults = filterDateResults.filter((res) => {
            return res.favorites.length > 0;
          });

          const { id } = cursor;
          const start = id ? findIndexByRecipeId(id) + 1 : 0;
          const end = start + take;
          const results = filterResults.slice(start, end);

          return Promise.resolve(results);
        });
    });

    test('Recipes on page 1', async () => {
      const ormProps = {
        ...commonOrmProps,
      };
      // Exercise: call the function
      const recipes = await repository.pickupList(
        ormProps.take,
        undefined,
        fromDate,
        toDate,
      );

      // Verify: ensure recipe.pickupList was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(recipes).toStrictEqual(pickupListResults.slice(0, ormProps.take));
      expect(recipes.length).toStrictEqual(ormProps.take);
    });
    test('Recipes on page 2', async () => {
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { id: pickupListResults[commonOrmProps.take - 1].id },
      };
      const {
        take,
        cursor: { id },
      } = ormProps;
      // Exercise: call the function
      const recipes = await repository.pickupList(take, id, fromDate, toDate);

      // Verify: ensure recipe.pickupList was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByRecipeId(id) + 1;
      const end = start + take;
      expect(recipes).toStrictEqual(pickupListResults.slice(start, end));
      expect(recipes.length).toStrictEqual(take);
    });
    test('Recipes on page 3', async () => {
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { id: pickupListResults[commonOrmProps.take * 2 - 1].id },
      };
      const {
        take,
        cursor: { id },
      } = ormProps;
      const filterDateResults = pickupListResults.map((res) => {
        return {
          ...res,
          favorites: res.favorites.filter(
            (favorite) =>
              favorite.createdAt <= fromDate && favorite.createdAt >= toDate,
          ),
        };
      });
      const filterResults = filterDateResults.filter((res) => {
        return res.favorites.length > 0;
      });

      // Exercise: call the function
      const recipes = await repository.pickupList(take, id, fromDate, toDate);

      // Verify: ensure recipe.pickupList was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByRecipeId(id) + 1;
      const end = start + take;

      expect(recipes).toStrictEqual(filterResults.slice(start, end));
      expect(recipes.length).toStrictEqual(1);
    });
  });
});
