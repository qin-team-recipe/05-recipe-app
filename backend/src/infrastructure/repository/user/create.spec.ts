import createPrismaMock from 'prisma-mock';
import { UserCreateInput } from 'src/entity/user.entity';
import { UserRepository } from './repository';

let client;
let repository: UserRepository;
beforeAll(() => {
  client = createPrismaMock();
  repository = new UserRepository(client);
});

describe('UserRepository.create()', () => {
  test('Create user with all values', async () => {
    // Exercise: call the function
    const userProps: UserCreateInput = {
      email: 'test@test.com',
      nickname: 'John Doe',
      imgPath: 'test/path',
      introduction: 'test introduction',
      twitterId: 'test_twitter_id',
      instagramId: 'test_instagram_id',
      siteUrl: 'https://test_site_url.com',
    };
    const user = await repository.create(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(client.user.create).toHaveBeenCalledWith({
      data: userProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.email).toStrictEqual(userProps.email);
    expect(user.nickname).toStrictEqual(userProps.nickname);
    expect(user.imgPath).toStrictEqual(userProps.imgPath);
    expect(user.introduction).toStrictEqual(userProps.introduction);
    expect(user.twitterId).toStrictEqual(userProps.twitterId);
    expect(user.instagramId).toStrictEqual(userProps.instagramId);
    expect(user.siteUrl).toStrictEqual(userProps.siteUrl);
  });

  test('Create user without optional values', async () => {
    // Exercise: call the function
    const userPropsWithoutOptional: UserCreateInput = {
      nickname: 'John Doe',
      email: 'test@test.com',
      introduction: 'test introduction',
    };
    const user = await repository.create(userPropsWithoutOptional);

    // Verify: ensure user.create was called with correct arguments
    expect(client.user.create).toHaveBeenCalledWith({
      data: userPropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.nickname).toStrictEqual(userPropsWithoutOptional.nickname);
    expect(user.email).toStrictEqual(userPropsWithoutOptional.email);
    expect(user.introduction).toStrictEqual(
      userPropsWithoutOptional.introduction,
    );
  });
});
