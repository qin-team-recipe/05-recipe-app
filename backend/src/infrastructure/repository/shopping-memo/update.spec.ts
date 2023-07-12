import { Test } from '@nestjs/testing';
import updatePrismaMock from 'prisma-mock';
import { ShoppingMemoUpdateInput } from 'src/entity/shopping-memo.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { InvalidArgsError } from 'src/utils/exception/invalid-args.error';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { ShoppingMemoRepository } from './repository';

let repository: ShoppingMemoRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

const updateResult: ShoppingMemoUpdateInput = {
  id: 'cuid',
  userId: 'cuid',
  name: 'initial name',
  boughtFlag: false,
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

  // Mock shoppingMemo.update method
  ormMock.shoppingMemo.update = jest.fn().mockImplementation((updateProps) => {
    // If the shopping-memo with the given ID exists, return the updated shopping-memo
    if (updateProps.where.id === updateResult.id) {
      return Promise.resolve({
        ...updateResult,
        ...updateProps.data,
      });
    }

    // If the shopping-memo does not exist, return null
    return Promise.resolve(null);
  });
});

describe('ShoppingMemoRepository.update()', () => {
  test('Update shopping-memo with non-string id', async () => {
    // Exercise: call the function
    const ShoppingMemoProps: ShoppingMemoUpdateInput = {
      id: undefined,
      userId: updateResult.userId,
      name: 'test name',
      boughtFlag: false,
    };
    const shoppingMemo = repository.update(ShoppingMemoProps);
    await expect(shoppingMemo).rejects.toThrowError(
      new InvalidArgsError('id must be a string'),
    );
  });

  test('Update shopping-memo with non-existent id', async () => {
    // Exercise: call the function
    const shoppingMemoProps: ShoppingMemoUpdateInput = {
      id: 'non-existent-id',
      userId: updateResult.userId,
      name: 'test name',
      boughtFlag: false,
    };
    const shoppingMemo = await repository.update(shoppingMemoProps);

    // Verify: ensure the function returns the data we specified
    expect(shoppingMemo).toBeNull();
  });

  test('Update shopping-memo', async () => {
    // Exercise: call the function
    const shoppingMemoProps: ShoppingMemoUpdateInput = {
      id: updateResult.id,
      userId: updateResult.userId,
      name: 'test name',
      boughtFlag: false,
    };
    const shoppingMemo = await repository.update(shoppingMemoProps);

    // Verify: ensure shoppingMemo.update was called with correct arguments
    expect(ormMock.shoppingMemo.update).toHaveBeenCalledWith({
      where: { id: shoppingMemoProps.id },
      data: shoppingMemoProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMemo?.id).toStrictEqual(shoppingMemoProps.id);
    expect(shoppingMemo?.userId).toStrictEqual(shoppingMemoProps.userId);
    expect(shoppingMemo?.name).toStrictEqual(shoppingMemoProps.name);
    expect(shoppingMemo?.boughtFlag).toStrictEqual(
      shoppingMemoProps.boughtFlag,
    );
  });
});
