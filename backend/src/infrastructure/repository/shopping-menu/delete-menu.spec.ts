import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { ShoppingMenuRepository } from './repository';

let repository: ShoppingMenuRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

let shoppingMenus = [
  {
    id: 'delete-id',
    userId: 'cuid',
    name: 'name',
    boughtFlag: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'not-delete-id',
    userId: 'cuid',
    name: 'name',
    boughtFlag: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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

  // Mock shoppingMenu.delete method
  ormMock.shoppingMenu.delete = jest.fn().mockImplementation((props) => {
    shoppingMenus = shoppingMenus.filter((shoppingMenu) => {
      return shoppingMenu.id === props.where.id;
    });
  });
});

describe('ShoppingMenuRepository.delete()', () => {
  test('Delete shoppingMenu', async () => {
    // Exercise: call the function
    const id = 'delete-id';
    await repository.deleteMenu(id);

    // Verify: ensure shoppingMenu.delete was called with correct arguments
    expect(ormMock.shoppingMenu.delete).toHaveBeenCalledWith({
      where: { id },
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMenus.length).toStrictEqual(1);
  });
});
