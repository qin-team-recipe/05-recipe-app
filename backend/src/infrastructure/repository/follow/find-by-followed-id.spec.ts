import { Test } from '@nestjs/testing';
import findByIdPrismaMock from 'prisma-mock';
import { FollowResponse } from 'src/entity/follow.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { FollowRepository } from 'src/infrastructure/repository/follow/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let repository: FollowRepository;
let ormMock: OrmClient;

const findResult: FollowResponse = {
  id: 1234567890,
  followerId: 'follower-cuid',
  followedId: 'followed-cuid',
  createdAt: new Date(),
};

beforeAll(async () => {
  ormMock = findByIdPrismaMock();

  const loggerMock = {
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

  // Mock follow.findFirst method
  ormMock.follow.findFirst = jest.fn().mockImplementation((props) => {
    // If the follow with the given ID exists, return the findById follow
    if (
      props.where.followerId === findResult.followerId &&
      props.where.followedId === findResult.followedId
    ) {
      return Promise.resolve(findResult);
    }

    // If the follow does not exist, return null
    return Promise.resolve(null);
  });
});

describe('FollowRepository.findById()', () => {
  const ormProps = {
    where: {
      followerId: findResult.followerId,
      followedId: findResult.followedId,
    },
  };

  test('Find follow', async () => {
    // Exercise: call the function
    const follow = await repository.findById(
      findResult.followerId,
      findResult.followedId,
    );

    // Verify: ensure follow.findById was called with correct arguments
    expect(ormMock.follow.findFirst).toHaveBeenCalledWith({
      ...ormProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(follow?.id).toStrictEqual(findResult.id);
    expect(follow?.followerId).toStrictEqual(findResult.followerId);
    expect(follow?.followedId).toStrictEqual(findResult.followedId);
    expect(follow?.createdAt).toStrictEqual(findResult.createdAt);
  });
});
