import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { DeleteRecipeResponse } from 'src/entity/recipe.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { RecipeRepository } from 'src/infrastructure/repository/recipe/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let repository: RecipeRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

const currentRecipes: DeleteRecipeResponse[] = [];
for (let i = 1; i <= 5; i++) {
  currentRecipes.push({
    id: i === 1 ? 'delete-id' : 'not-delete-id' + i,
    userId: 'user-cuid' + i,
    title: 'test title' + i,
    description: 'test description' + i,
    servingCount: 0,
    favoriteCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    draftFlag: true,
    recipeImages: [
      {
        id: 1234567890,
        path: 'test/img/path1',
      },
      {
        id: 9876543210,
        path: 'test/img/path2',
      },
    ],
    recipeSteps: [
      {
        id: 1234567890,
        description: 'test description1',
        stepNum: 1,
      },
      {
        id: 9876543210,
        description: 'test description2',
        stepNum: 2,
      },
    ],
    recipeLinks: [
      {
        id: 1234567890,
        url: 'https://test1.com',
      },
      {
        id: 9876543210,
        url: 'https://test2.com',
      },
    ],
    recipeItems: [
      {
        id: 1234567890,
        name: 'test name1',
        description: 'test description1',
      },
      {
        id: 9876543210,
        name: 'test name2',
        description: 'test description2',
      },
    ],
    favorites: [
      { userId: 'favorite-user-cuid1' },
      { userId: 'favorite-user-cuid2' },
    ],
  });
}
let deleteRecipeResults: DeleteRecipeResponse[] = [];

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

  // Mock recipe.delete method
  ormMock.recipe.delete = jest.fn().mockImplementation((props) => {
    deleteRecipeResults = currentRecipes.filter((recipe) => {
      return recipe.id !== props.where.id;
    });
  });
});

describe('RecipeRepository.delete()', () => {
  test('Delete recipe', async () => {
    // Exercise: call the function
    const id = 'delete-id';
    await repository.delete(id);
    // Verify: ensure recipe.delete was called with correct arguments
    expect(ormMock.recipe.delete).toHaveBeenCalledWith({
      where: { id },
    });

    // Verify: ensure the function returns the data we specified
    expect(deleteRecipeResults.length).toStrictEqual(currentRecipes.length - 1);
  });
});
