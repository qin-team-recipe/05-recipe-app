import createPrismaMock from 'prisma-mock';
import { CreateUserProps, UserRepository } from './repository';

let client;
let repository: UserRepository;
beforeEach(() => {
  client = createPrismaMock();
  repository = new UserRepository(client);
});

describe('UserRepository.create()', () => {
  test('Create user with all values', async () => {
    // Exercise: call the function
    const userProps: CreateUserProps = {
      nickname: 'John Doe',
      email: 'test@test.com',
      provider: 'GOOGLE',
      providerId: 'test-provider-id',
      introduction: 'test introduction',
    };
    const user = await repository.create(userProps);

    // Verify: ensure user.create was called with correct arguments
    expect(client.user.create).toHaveBeenCalledWith({
      data: userProps,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.nickname).toEqual(userProps.nickname);
    expect(user.email).toEqual(userProps.email);
    expect(user.provider).toEqual(userProps.provider);
    expect(user.providerId).toEqual(userProps.providerId);
    expect(user.introduction).toEqual(userProps.introduction);
  });

  test('Create user without optional values', async () => {
    // Exercise: call the function
    const userPropsWithoutOptional: CreateUserProps = {
      nickname: 'John Doe',
      email: 'test@test.com',
      provider: 'GOOGLE',
      providerId: 'test-provider-id',
      introduction: 'test introduction',
    };
    const user = await repository.create(userPropsWithoutOptional);

    // Verify: ensure user.create was called with correct arguments
    expect(client.user.create).toHaveBeenCalledWith({
      data: userPropsWithoutOptional,
    });

    // Verify: ensure the function returns the data we specified
    expect(user.nickname).toEqual(userPropsWithoutOptional.nickname);
    expect(user.email).toEqual(userPropsWithoutOptional.email);
    expect(user.provider).toEqual(userPropsWithoutOptional.provider);
    expect(user.providerId).toEqual(userPropsWithoutOptional.providerId);
    expect(user.introduction).toEqual(userPropsWithoutOptional.introduction);
  });
});
