import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { RecipeCreateInput } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { RecipeRepository } from './repository';

let repository: RecipeRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

beforeAll(async () => {
  ormMock = createPrismaMock();

  loggerMock = {
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

describe('RecipeRepository.create()', () => {
  test('Create recipe with all values', async () => {
    // Exercise: call the function
    const recipeProps: RecipeCreateInput = {
      userId: 'cuid',
      title: 'test title',
      description: 'test description',
      servingCount: 1,
      favoriteCount: 1,
      draftFlag: true,
      recipeImages: {
        createMany: {
          data: [
            {
              id: 1234567890,
              path: 'test/img/path',
            },
            {
              id: 9876543210,
              path: 'test/img/path',
            },
          ],
        },
      },
      recipeSteps: {
        createMany: {
          data: [
            {
              id: 1234567890,
              description: 'test description',
              stepNum: 1,
            },
            {
              id: 9876543210,
              description: 'test description',
              stepNum: 2,
            },
          ],
        },
      },
      recipeLinks: {
        createMany: {
          data: [
            {
              id: 1234567890,
              url: 'https://test.com',
            },
            {
              id: 9876543210,
              url: 'https://test.com',
            },
          ],
        },
      },
      recipeItems: {
        createMany: {
          data: [
            {
              id: 1234567890,
              name: 'test name',
              description: 'test description',
            },
            {
              id: 9876543210,
              name: 'test name',
              description: 'test description',
            },
          ],
        },
      },
    };
    const recipe = await repository.create(recipeProps);

    // Verify: ensure recipe.create was called with correct arguments
    expect(ormMock.recipe.create).toHaveBeenCalledWith({
      data: recipeProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(recipe.userId).toStrictEqual(recipeProps.userId);
    expect(recipe.title).toStrictEqual(recipeProps.title);
    expect(recipe.description).toStrictEqual(recipeProps.description);
    expect(recipe.servingCount).toStrictEqual(recipeProps.servingCount);
    expect(recipe.favoriteCount).toStrictEqual(recipeProps.favoriteCount);
    expect(recipe.draftFlag).toStrictEqual(recipeProps.draftFlag);
  });

  test('Create recipe without optional values', async () => {
    // Exercise: call the function
    const recipePropsWithoutOptional: RecipeCreateInput = {
      userId: 'cuid',
      title: 'test title',
      description: 'test description',
      servingCount: 1,
      favoriteCount: 0,
      draftFlag: true,
      recipeImages: {
        createMany: {
          data: [
            {
              id: 1234567890,
              path: 'test/img/path',
            },
            {
              id: 9876543210,
              path: 'test/img/path',
            },
          ],
        },
      },
      recipeSteps: {
        createMany: {
          data: [
            {
              id: 1234567890,
              description: 'test description',
              stepNum: 1,
            },
            {
              id: 9876543210,
              description: 'test description',
              stepNum: 2,
            },
          ],
        },
      },
      recipeLinks: {
        createMany: {
          data: [
            {
              id: 1234567890,
              url: 'https://test.com',
            },
            {
              id: 9876543210,
              url: 'https://test.com',
            },
          ],
        },
      },
      recipeItems: {
        createMany: {
          data: [
            {
              id: 1234567890,
              name: 'test name',
              description: 'test description',
            },
            {
              id: 9876543210,
              name: 'test name',
              description: 'test description',
            },
          ],
        },
      },
    };
    const recipe = await repository.create(recipePropsWithoutOptional);

    // Verify: ensure recipe.create was called with correct arguments
    expect(ormMock.recipe.create).toHaveBeenCalledWith({
      data: recipePropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(recipe.userId).toStrictEqual(recipePropsWithoutOptional.userId);
    expect(recipe.title).toStrictEqual(recipePropsWithoutOptional.title);
    expect(recipe.description).toStrictEqual(
      recipePropsWithoutOptional.description,
    );
    expect(recipe.servingCount).toStrictEqual(
      recipePropsWithoutOptional.servingCount,
    );
    expect(recipe.draftFlag).toStrictEqual(
      recipePropsWithoutOptional.draftFlag,
    );
  });
});
