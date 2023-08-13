import { Test } from '@nestjs/testing';
import createPrismaMock from 'prisma-mock';
import { FollowResponse } from 'src/entity/follow.entity';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { FollowRepository } from 'src/infrastructure/repository/follow/repository';
import { CustomLoggerService } from 'src/utils/logger/custom-logger.service';

let repository: FollowRepository;
let ormMock: OrmClient;
let loggerMock: Partial<CustomLoggerService>;

const currentFollows: FollowResponse[] = [];
for (let i = 1; i <= 5; i++) {
  currentFollows.push({
    id: i,
    followerId: 'follower-cuid',
    followedId: 'followed-cuid',
    createdAt: new Date(),
  });
}
let deleteFollowResults: FollowResponse[] = [];

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

  // Mock follow.delete method
  ormMock.follow.delete = jest.fn().mockImplementation((props) => {
    deleteFollowResults = currentFollows.filter((follow) => {
      return follow.id !== props.where.id;
    });
  });
});

describe('FollowRepository.delete()', () => {
  test('Delete follow', async () => {
    // Exercise: call the function
    const deleteFollowId = 1;
    await repository.delete(deleteFollowId);
    // Verify: ensure follow.delete was called with correct arguments
    expect(ormMock.follow.delete).toHaveBeenCalledWith({
      where: { id: deleteFollowId },
    });

    // Verify: ensure the function returns the data we specified
    expect(deleteFollowResults.length).toStrictEqual(currentFollows.length - 1);
  });
});
