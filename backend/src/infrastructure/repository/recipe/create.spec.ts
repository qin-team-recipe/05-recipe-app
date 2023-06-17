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
      name: '上級レシピ',
      description: 'とても美味しいレシピです',
      servingCount: 1,
      favoriteCount: 1,
      draftFlag: true,
    };
    const recipe = await repository.create(recipeProps);

    // Verify: ensure recipe.create was called with correct arguments
    expect(ormMock.recipe.create).toHaveBeenCalledWith({
      data: recipeProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(recipe.userId).toStrictEqual(recipeProps.userId);
    expect(recipe.name).toStrictEqual(recipeProps.name);
    expect(recipe.description).toStrictEqual(recipeProps.description);
    expect(recipe.servingCount).toStrictEqual(recipeProps.servingCount);
    expect(recipe.favoriteCount).toStrictEqual(recipeProps.favoriteCount);
    expect(recipe.draftFlag).toStrictEqual(recipeProps.draftFlag);
  });

  test('Create recipe without optional values', async () => {
    // Exercise: call the function
    const recipePropsWithoutOptional: RecipeCreateInput = {
      userId: 'cuid',
      name: '上級レシピ',
      description: 'とても美味しいレシピです',
      servingCount: 1,
      draftFlag: true,
    };
    const recipe = await repository.create(recipePropsWithoutOptional);

    // Verify: ensure recipe.create was called with correct arguments
    expect(ormMock.recipe.create).toHaveBeenCalledWith({
      data: recipePropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(recipe.userId).toStrictEqual(recipePropsWithoutOptional.userId);
    expect(recipe.name).toStrictEqual(recipePropsWithoutOptional.name);
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
