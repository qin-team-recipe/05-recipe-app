import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { ShoppingMemoCreateInput } from 'src/entity/shopping-memo.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';
import { ShoppingMemoRepository } from './repository';

let repository: ShoppingMemoRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

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
});

describe('ShoppingMemoRepository.create()', () => {
  test('Create shoppingMemo with all values', async () => {
    // Exercise: call the function
    const shoppingMemoProps: ShoppingMemoCreateInput = {
      userId: 'cuid',
      name: 'にんじん',
      boughtFlag: true,
    };
    const shoppingMemo = await repository.create(shoppingMemoProps);

    // Verify: ensure shoppingMemo.create was called with correct arguments
    expect(ormMock.shoppingMemo.create).toHaveBeenCalledWith({
      data: shoppingMemoProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMemo.userId).toStrictEqual(shoppingMemoProps.userId);
    expect(shoppingMemo.name).toStrictEqual(shoppingMemoProps.name);
    expect(shoppingMemo.boughtFlag).toStrictEqual(shoppingMemoProps.boughtFlag);
  });

  test('Create shoppingMemo without optional values', async () => {
    // Exercise: call the function
    const shoppingMemoPropsWithoutOptional: ShoppingMemoCreateInput = {
      userId: 'cuid',
      name: 'にんじん',
      boughtFlag: true,
    };
    const shoppingMemo = await repository.create(
      shoppingMemoPropsWithoutOptional,
    );

    // Verify: ensure shoppingMemo.create was called with correct arguments
    expect(ormMock.shoppingMemo.create).toHaveBeenCalledWith({
      data: shoppingMemoPropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(shoppingMemo.userId).toStrictEqual(
      shoppingMemoPropsWithoutOptional.userId,
    );
    expect(shoppingMemo.name).toStrictEqual(
      shoppingMemoPropsWithoutOptional.name,
    );
    expect(shoppingMemo.boughtFlag).toStrictEqual(
      shoppingMemoPropsWithoutOptional.boughtFlag,
    );
  });
});
