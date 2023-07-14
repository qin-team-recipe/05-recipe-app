import { Test } from '@nestjs/testing';
import updatePrismaMock from 'prisma-mock';
import { ShoppingMenuUpdateInput } from 'src/entity/shopping-menu.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { ShoppingMenuRepository } from './repository';

let repository: ShoppingMenuRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

const updateResult: ShoppingMenuUpdateInput = {
  id: 'cuid',
  userId: 'cuid',
  recipeId: 'cuid',
  name: 'initial name',
  order: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  ormMock = updatePrismaMock();

  loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      ShoppingMenuRepository,
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

  repository = moduleRef.get<ShoppingMenuRepository>(ShoppingMenuRepository);

  // Mock shoppingMenu.update method
  ormMock.shoppingMenu.update = jest.fn().mockImplementation((updateProps) => {
    // If the shopping-menu with the given ID exists, return the updated shopping-menu
    if (updateProps.where.id === updateResult.id) {
      return Promise.resolve({
        ...updateResult,
        ...updateProps.data,
      });
    }

    // If the shopping-menu does not exist, return null
    return Promise.resolve(null);
  });
});

describe('ShoppingMenuRepository.update()', () => {
  test('Update shopping-menu with non-string id', async () => {
    // Exercise: call the function
    const ShoppingMenuProps: ShoppingMenuUpdateInput = {
      id: undefined,
      userId: updateResult.userId,
      recipeId: updateResult.recipeId,
      name: 'test name',
      order: 0,
    };
    const shoppingMenu = repository.update(ShoppingMenuProps);
    await expect(shoppingMenu).rejects.toThrowError(
      new InvalidArgsError('id must be a string'),
    );
  });

  test('Update shopping-menu with non-existent id', async () => {
    // Exercise: call the function
    const shoppingMenuProps: ShoppingMenuUpdateInput = {
      id: 'non-existent-id',
      userId: updateResult.userId,
      recipeId: updateResult.recipeId,
      name: 'test name',
      order: 0,
    };
    const shoppingMenu = await repository.update(shoppingMenuProps);

    // Verify: ensure the function returns the data we specified
    expect(shoppingMenu).toBeNull();
  });

  test('Update shopping-menu', async () => {
    // Exercise: call the function
    const shoppingMenuProps: ShoppingMenuUpdateInput = {
      id: updateResult.id,
      userId: updateResult.userId,
      recipeId: updateResult.recipeId,
      name: 'test name',
      order: 0,
    };
    const shoppingMenu = await repository.update(shoppingMenuProps);

    // Verify: ensure shoppingMenu.update was called with correct arguments
    expect(ormMock.shoppingMenu.update).toHaveBeenCalledWith({
      where: { id: shoppingMenuProps.id },
      data: shoppingMenuProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMenu?.id).toStrictEqual(shoppingMenuProps.id);
    expect(shoppingMenu?.userId).toStrictEqual(shoppingMenuProps.userId);
    expect(shoppingMenu?.recipeId).toStrictEqual(shoppingMenuProps.recipeId);
    expect(shoppingMenu?.name).toStrictEqual(shoppingMenuProps.name);
    expect(shoppingMenu?.order).toStrictEqual(shoppingMenuProps.order);
  });
});
