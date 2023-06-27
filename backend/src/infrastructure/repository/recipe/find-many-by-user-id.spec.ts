import { Test } from '@nestjs/testing';
import paginatePrismaMock from 'prisma-mock';
import { findManyByUserIdRecipeResponse } from 'src/entity/recipe.entity';
import { UserCreateInput } from 'src/entity/user.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { RecipeRepository } from 'src/infrastructure/repository/recipe/repository';
import { UserRepository } from 'src/infrastructure/repository/user/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let recipeRepository: RecipeRepository;
let userRepository: UserRepository;
let ormMock: OrmClient;

const findManyByUserIdResults: findManyByUserIdRecipeResponse = [];
for (let i = 1; i <= 11; i++) {
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

  const userModuleRef = await Test.createTestingModule({
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

  recipeRepository = recipeModuleRef.get<RecipeRepository>(RecipeRepository);
  userRepository = userModuleRef.get<UserRepository>(UserRepository);
});

describe('RecipeRepository.findManyByUserId()', () => {
  const commonOrmProps = {
    take: 5,
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
    test('0 recipes', async () => {
      const ormProps = {
        ...commonOrmProps,
        cursor: undefined,
      };
      const userProps: UserCreateInput = {
        email: 'test@test.com',
        userAuthProviders: {
          create: {
            provider: 'GOOGLE',
            providerId: '1234567890',
          },
        },
      };
      const user = await userRepository.createWithAuthProvider(userProps);
      // Exercise: call the function
      const recipes = await recipeRepository.findManyByUserId(
        user.id,
        ormProps.take,
      );
      console.log(user);
      console.log(recipes);

      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(recipes).toStrictEqual([]);
    });
  });

  describe('when the recipe exists', () => {
    const findIndexByRecipeId = (id: string): number => {
      return findManyByUserIdResults.findIndex((recipe) => recipe.id === id);
    };
    beforeAll(async () => {
      // Mock recipe.findMany method
      ormMock.recipe.findMany = jest
        .fn()
        .mockImplementation(({ take, cursor = {} }) => {
          const { id } = cursor;
          const start = id ? findIndexByRecipeId(id) + 1 : 0;
          const end = start + take;
          const results = findManyByUserIdResults.slice(start, end);
          return Promise.resolve(results);
        });
    });
    test('Recipes on page 1', async () => {
      const ormProps = {
        ...commonOrmProps,
      };
      const userProps: UserCreateInput = {
        email: 'test@test.com',
        userAuthProviders: {
          create: {
            provider: 'GOOGLE',
            providerId: '1234567890',
          },
        },
      };
      const user = await userRepository.createWithAuthProvider(userProps);
      // Exercise: call the function
      const recipes = await recipeRepository.findManyByUserId(
        user.id,
        ormProps.take,
      );
      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      expect(recipes).toStrictEqual(
        findManyByUserIdResults.slice(0, ormProps.take),
      );
      expect(recipes.length).toStrictEqual(ormProps.take);
    });
    test('Recipes on page 2', async () => {
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { id: findManyByUserIdResults[commonOrmProps.take - 1].id },
      };
      const {
        take,
        cursor: { id },
      } = ormProps;
      const userProps: UserCreateInput = {
        email: 'test@test.com',
        userAuthProviders: {
          create: {
            provider: 'GOOGLE',
            providerId: '1234567890',
          },
        },
      };
      const user = await userRepository.createWithAuthProvider(userProps);
      // Exercise: call the function
      const recipes = await recipeRepository.findManyByUserId(
        user.id,
        take,
        id,
      );
      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByRecipeId(id) + 1;
      const end = start + take;
      expect(recipes).toStrictEqual(findManyByUserIdResults.slice(start, end));
      expect(recipes.length).toStrictEqual(take);
    });
    test('Recipes on page 3', async () => {
      const ormProps = {
        ...commonOrmProps,
        skip: 1,
        cursor: { id: findManyByUserIdResults[commonOrmProps.take * 2 - 1].id },
      };
      const {
        take,
        cursor: { id },
      } = ormProps;
      const userProps: UserCreateInput = {
        email: 'test@test.com',
        userAuthProviders: {
          create: {
            provider: 'GOOGLE',
            providerId: '1234567890',
          },
        },
      };
      const user = await userRepository.createWithAuthProvider(userProps);
      // Exercise: call the function
      const recipes = await recipeRepository.findManyByUserId(
        user.id,
        take,
        id,
      );
      // Verify: ensure recipe.findManyByUserId was called with correct arguments
      expect(ormMock.recipe.findMany).toHaveBeenCalledWith(ormProps);

      // Verify: ensure the function returns the data we specified
      const start = findIndexByRecipeId(id) + 1;
      const end = start + take;
      expect(recipes).toStrictEqual(findManyByUserIdResults.slice(start, end));
      expect(recipes.length).toStrictEqual(1);
    });
  });
});
