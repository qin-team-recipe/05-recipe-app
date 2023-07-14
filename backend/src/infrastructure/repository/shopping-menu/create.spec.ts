import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { ShoppingMenuCreateInput } from 'src/entity/shopping-menu.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { ShoppingMenuRepository } from './repository';

let repository: ShoppingMenuRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

beforeAll(async () => {
  ormMock = createPrismaMock();

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
});

describe('ShoppingMenuRepository.create()', () => {
  test('Create shoppingMenu with all values', async () => {
    // Exercise: call the function
    const shoppingMenuProps: ShoppingMenuCreateInput = {
      userId: 'cuid',
      recipeId: 'cuid',
      name: 'グラタン',
      order: 0,
    };
    const shoppingMenu = await repository.create(shoppingMenuProps);

    // Verify: ensure shoppingMenu.create was called with correct arguments
    expect(ormMock.shoppingMenu.create).toHaveBeenCalledWith({
      data: shoppingMenuProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMenu.userId).toStrictEqual(shoppingMenuProps.userId);
    expect(shoppingMenu.recipeId).toStrictEqual(shoppingMenuProps.recipeId);
    expect(shoppingMenu.name).toStrictEqual(shoppingMenuProps.name);
    expect(shoppingMenu.order).toStrictEqual(shoppingMenuProps.order);
  });

  test('Create shoppingMenu without optional values', async () => {
    // Exercise: call the function
    const shoppingMenuPropsWithoutOptional: ShoppingMenuCreateInput = {
      userId: 'cuid',
      recipeId: 'cuid',
      name: 'グラタン',
      order: 0,
    };
    const shoppingMenu = await repository.create(
      shoppingMenuPropsWithoutOptional,
    );

    // Verify: ensure shoppingMenu.create was called with correct arguments
    expect(ormMock.shoppingMenu.create).toHaveBeenCalledWith({
      data: shoppingMenuPropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMenu.userId).toStrictEqual(
      shoppingMenuPropsWithoutOptional.userId,
    );
    expect(shoppingMenu.recipeId).toStrictEqual(
      shoppingMenuPropsWithoutOptional.recipeId,
    );
    expect(shoppingMenu.name).toStrictEqual(
      shoppingMenuPropsWithoutOptional.name,
    );
    expect(shoppingMenu.order).toStrictEqual(
      shoppingMenuPropsWithoutOptional.order,
    );
  });
});
