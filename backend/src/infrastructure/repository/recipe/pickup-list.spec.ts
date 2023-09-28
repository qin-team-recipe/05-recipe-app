import { Test } from '@nestjs/testing';
import paginatePrismaMock from 'prisma-mock';
import { PickupListRecipeResponse } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { RecipeRepository } from 'src/infrastructure/repository/recipe/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let repository: RecipeRepository;
let ormMock: OrmClient;

const pickupListResults: PickupListRecipeResponse = [];
for (let i = 1; i <= 11; i++) {
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
  const commonOrmProps = {
    take: 5,
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
    test('0 favoriteRecipes', async () => {
      const ormProps = {
        ...commonOrmProps,
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
        .mockImplementation(({ take, cursor = {} }) => {
          const { id } = cursor;
          const start = id ? findIndexByRecipeId(id) + 1 : 0;
          const end = start + take;
          const results = pickupListResults.slice(start, end);
          return Promise.resolve(results);
        });
    });
    test('Recipes on page 1', async () => {
      const ormProps = {
        ...commonOrmProps,
      };
      // Exercise: call the function
      const recipes = await repository.pickupList(ormProps.take);

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
      const recipes = await repository.pickupList(take, id);

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
      // Exercise: call the function
      const recipes = await repository.pickupList(take, id);

      // Verify: ensure recipe.pickupList was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByRecipeId(id) + 1;
      const end = start + take;
      expect(recipes).toStrictEqual(pickupListResults.slice(start, end));
      expect(recipes.length).toStrictEqual(1);
    });
  });
});
