import { Test } from '@nestjs/testing';
import updatePrismaMock from 'prisma-mock';
import { RecipeUpdateInput } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { RecipeRepository } from './repository';

let repository: RecipeRepository;
let ormMock: OrmClient;

const updateResult: RecipeUpdateInput = {
  id: 'cuid',
  userId: 'cuid',
  title: 'initial title',
  description: 'initial description',
  servingCount: 0,
  favoriteCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  ormMock = updatePrismaMock();

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

  // Mock recipe.update method
  ormMock.recipe.update = jest.fn().mockImplementation((updateProps) => {
    // If the recipe with the given ID exists, return the updated recipe
    if (updateProps.where.id === updateResult.id) {
      return Promise.resolve({
        ...updateResult,
        ...updateProps.data,
      });
    }

    // If the recipe does not exist, return null
    return Promise.resolve(null);
  });
});

describe('RecipeRepository.update()', () => {
  test('Update recipe with non-string id', async () => {
    // Exercise: call the function
    const recipeProps: RecipeUpdateInput = {
      id: undefined,
      userId: updateResult.userId,
      title: 'test title',
      description: 'test description',
      servingCount: 1,
      favoriteCount: 1,
    };
    const recipe = repository.update(recipeProps);
    await expect(recipe).rejects.toThrowError(
      new InvalidArgsError('id must be a string'),
    );
  });

  test('Update recipe with non-existent id', async () => {
    // Exercise: call the function
    const recipeProps: RecipeUpdateInput = {
      id: 'non-existent-id',
      userId: updateResult.userId,
      title: 'test title',
      description: 'test description',
      servingCount: 1234,
      favoriteCount: 4321,
    };
    const recipe = await repository.update(recipeProps);

    // Verify: ensure the function returns the data we specified
    expect(recipe).toBeNull();
  });

  test('Update recipe', async () => {
    // Exercise: call the function
    const recipeProps: RecipeUpdateInput = {
      id: updateResult.id,
      userId: updateResult.userId,
      title: 'test title',
      description: 'test description',
      servingCount: 1,
      favoriteCount: 1,
    };
    const recipe = await repository.update(recipeProps);

    // Verify: ensure recipe.update was called with correct arguments
    expect(ormMock.recipe.update).toHaveBeenCalledWith({
      where: { id: recipeProps.id },
      data: recipeProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(recipe?.id).toStrictEqual(recipeProps.id);
    expect(recipe?.userId).toStrictEqual(recipeProps.userId);
    expect(recipe?.title).toStrictEqual(recipeProps.title);
    expect(recipe?.description).toStrictEqual(recipeProps.description);
    expect(recipe?.servingCount).toStrictEqual(recipeProps.servingCount);
    expect(recipe?.favoriteCount).toStrictEqual(recipeProps.favoriteCount);
  });
});
