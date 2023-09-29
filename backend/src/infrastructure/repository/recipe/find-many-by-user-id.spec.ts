import { Test } from '@nestjs/testing';
import paginatePrismaMock from 'prisma-mock';
import { findManyByUserIdRecipeResponse } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { RecipeRepository } from 'src/infrastructure/repository/recipe/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let recipeRepository: RecipeRepository;
let ormMock: OrmClient;

const findManyByUserIdResults: findManyByUserIdRecipeResponse = [];
for (let i = 1; i <= 22; i++) {
  findManyByUserIdResults.push({
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

const searchData = findManyByUserIdResults.map((recipe, index) => {
  return {
    ...recipe,
    userId: index % 2 === 0 ? 'expect-found' : 'expect-not-found',
  };
});

beforeAll(async () => {
  ormMock = paginatePrismaMock();

  const loggerMock = {
    error: jest.fn(),
  };

  const recipeModuleRef = await Test.createTestingModule({
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

  recipeRepository = recipeModuleRef.get<RecipeRepository>(RecipeRepository);
});

describe('RecipeRepository.findManyByUserId()', () => {
  const commonOrmProps = {
    take: 5,
    where: { userId: 'expect-found' },
    orderBy: {
      createdAt: 'desc',
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
      const recipes = await recipeRepository.findManyByUserId(
        ormProps.where.userId,
        ormProps.take,
      );

      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(recipes).toStrictEqual([]);
    });
  });

  describe('when the recipe exists', () => {
    const findIndexByRecipeId = (
      id: string,
      recipes: findManyByUserIdRecipeResponse,
    ): number => {
      return recipes.findIndex((recipe) => recipe.id === id);
    };

    beforeAll(async () => {
      // Mock recipe.findMany method
      ormMock.recipe.findMany = jest
        .fn()
        .mockImplementation(({ where: { userId }, take, cursor = {} }) => {
          const searched = searchData.filter(
            (recipe) => recipe.userId === userId,
          );

          const { id } = cursor;
          const start = id ? findIndexByRecipeId(id, searched) + 1 : 0;
          const end = start + take;

          return Promise.resolve(searched.slice(start, end));
        });
    });
    test('Recipes on page 1', async () => {
      const ormProps = {
        ...commonOrmProps,
      };
      const userId = 'expect-found';
      const searched = searchData.filter((recipe) => recipe.userId === userId); // Exercise: call the function
      const recipes = await recipeRepository.findManyByUserId(
        ormProps.where.userId,
        ormProps.take,
      );

      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(recipes).toStrictEqual(searched.slice(0, ormProps.take));

      expect(recipes.length).toStrictEqual(ormProps.take);
    });
    test('Recipes on page 2', async () => {
      const userId = 'expect-found';
      const searched = searchData.filter((recipe) => recipe.userId === userId);
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { id: searched[commonOrmProps.take - 1].id },
      };
      const {
        take,
        cursor: { id },
      } = ormProps;

      // Exercise: call the function
      const recipes = await recipeRepository.findManyByUserId(
        ormProps.where.userId,
        take,
        id,
      );

      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByRecipeId(id, searched) + 1;
      const end = start + take;
      expect(recipes).toStrictEqual(searched.slice(start, end));
      expect(recipes.length).toStrictEqual(take);
    });
    test('Recipes on page 3', async () => {
      const userId = 'expect-found';
      const searched = searchData.filter((recipe) => recipe.userId === userId);
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { id: searched[commonOrmProps.take * 2 - 1].id },
      };
      const {
        take,
        cursor: { id },
      } = ormProps;

      // Exercise: call the function
      const recipes = await recipeRepository.findManyByUserId(
        ormProps.where.userId,
        take,
        id,
      );

      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByRecipeId(id, searched) + 1;
      const end = start + take;
      expect(recipes).toStrictEqual(searched.slice(start, end));
      expect(recipes.length).toStrictEqual(1);
    });
  });
});
