import { Test } from '@nestjs/testing';
import findByIdPrismaMock from 'prisma-mock';
import { FindRecipeResponse } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { RecipeRepository } from './repository';

let repository: RecipeRepository;
let ormMock: OrmClient;

const findResult: FindRecipeResponse = {
  id: 'cuid',
  userId: 'user-cuid',
  title: 'test title',
  description: 'test description',
  servingCount: 1,
  favoriteCount: 0,
  draftFlag: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  recipeImages: [
    {
      path: 'test/img/path1',
    },
    {
      path: 'test/img/path2',
    },
  ],
  recipeSteps: [
    {
      description: 'test description1',
      stepNum: 1,
    },
    {
      description: 'test description2',
      stepNum: 2,
    },
  ],
  recipeLinks: [
    {
      url: 'https://test1.com',
    },
    {
      url: 'https://test2.com',
    },
  ],
  recipeItems: [
    {
      name: 'test name1',
      description: 'test description1',
    },
    {
      name: 'test name2',
      description: 'test description2',
    },
  ],
  favorites: [
    { userId: 'favorite-user-cuid1' },
    { userId: 'favorite-user-cuid2' },
  ],
};

beforeAll(async () => {
  ormMock = findByIdPrismaMock();

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

  // Mock recipe.findUnique method
  ormMock.recipe.findUnique = jest.fn().mockImplementation((props) => {
    // If the recipe with the given ID exists, return the findById recipe
    if (props.where.id === findResult.id) {
      return Promise.resolve(findResult);
    }

    // If the user does not exist, return null
    return Promise.resolve(null);
  });
});

describe('RecipeRepository.findById()', () => {
  const ormProps = {
    select: {
      id: true,
      userId: true,
      title: true,
      description: true,
      servingCount: true,
      favoriteCount: true,
      draftFlag: true,
      createdAt: true,
      updatedAt: true,
      recipeImages: {
        select: {
          path: true,
        },
      },
      recipeSteps: {
        select: {
          description: true,
          stepNum: true,
        },
      },
      recipeLinks: {
        select: {
          url: true,
        },
      },
      recipeItems: {
        select: {
          name: true,
          description: true,
        },
      },
      favorites: {
        select: {
          userId: true,
        },
      },
    },
  };

  test('Find recipe with non-existent id', async () => {
    const id = 'non-existent-id';
    // Exercise: call the function
    const recipe = await repository.findById(id);

    // Verify: ensure recipe.findById was called with correct arguments
    expect(ormMock.recipe.findUnique).toHaveBeenCalledWith({
      where: { id },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(recipe).toBeNull();
  });

  test('Find recipe', async () => {
    // Exercise: call the function
    const recipe = await repository.findById(findResult.id);

    // Verify: ensure user.findById was called with correct arguments
    expect(ormMock.recipe.findUnique).toHaveBeenCalledWith({
      where: { id: findResult.id },
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(recipe?.id).toStrictEqual(findResult.id);
    expect(recipe?.userId).toStrictEqual(findResult.userId);
    expect(recipe?.title).toStrictEqual(findResult.title);
    expect(recipe?.description).toStrictEqual(findResult.description);
    expect(recipe?.servingCount).toStrictEqual(findResult.servingCount);
    expect(recipe?.favoriteCount).toStrictEqual(findResult.favoriteCount);
    expect(recipe?.draftFlag).toStrictEqual(findResult.draftFlag);
    expect(recipe?.createdAt).toStrictEqual(findResult.createdAt);
    expect(recipe?.updatedAt).toStrictEqual(findResult.updatedAt);
    expect(recipe?.recipeImages).toStrictEqual(findResult.recipeImages);
    expect(recipe?.recipeSteps).toStrictEqual(findResult.recipeSteps);
    expect(recipe?.recipeLinks).toStrictEqual(findResult.recipeLinks);
    expect(recipe?.recipeItems).toStrictEqual(findResult.recipeItems);
    expect(recipe?.favorites).toStrictEqual(findResult.favorites);
  });
});
