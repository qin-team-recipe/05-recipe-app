import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { ShoppingMemoRepository } from './repository';

let repository: ShoppingMemoRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

let shoppingMemos = [
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
      ShoppingMemoRepository,
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

  repository = moduleRef.get<ShoppingMemoRepository>(ShoppingMemoRepository);

  // Mock shoppingMemo.delete method
  ormMock.shoppingMemo.delete = jest.fn().mockImplementation((props) => {
    shoppingMemos = shoppingMemos.filter((shoppingMemo) => {
      return shoppingMemo.id === props.where.id;
    });
  });
});

describe('ShoppingMemoRepository.delete()', () => {
  test('Delete shoppingMemo', async () => {
    // Exercise: call the function
    const id = 'delete-id';
    await repository.delete(id);

    // Verify: ensure shoppingMemo.delete was called with correct arguments
    expect(ormMock.shoppingMemo.delete).toHaveBeenCalledWith({
      where: { id },
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMemos.length).toStrictEqual(1);
  });
});
