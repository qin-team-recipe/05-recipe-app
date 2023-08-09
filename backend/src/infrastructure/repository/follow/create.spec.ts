import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { FollowCreateInput } from 'src/entity/follow.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { FollowRepository } from 'src/infrastructure/repository/follow/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let repository: FollowRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

beforeAll(async () => {
  ormMock = createPrismaMock();

  loggerMock = {
    error: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    providers: [
      FollowRepository,
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

  repository = moduleRef.get<FollowRepository>(FollowRepository);
});

describe('FollowRepository.create()', () => {
  test('Create follow with all values', async () => {
    // Exercise: call the function
    const followProps: FollowCreateInput = {
      id: 1234567890,
      followerId: 'follower-cuid',
      followedId: 'followed-cuid',
      createdAt: new Date(),
    };

    const follow = await repository.create(followProps);

    // Verify: ensure follow.create was called with correct arguments
    expect(ormMock.follow.create).toHaveBeenCalledWith({
      data: followProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(follow.id).toStrictEqual(followProps.id);
    expect(follow.followerId).toStrictEqual(followProps.followerId);
    expect(follow.followedId).toStrictEqual(followProps.followedId);
    expect(follow.createdAt).toStrictEqual(followProps.createdAt);
  });
});
