import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProviderService';

let fakeUsersRespository: FakeUsersRespository;
let listProvidersService: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();

    listProvidersService = new ListProvidersService(fakeUsersRespository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRespository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const user2 = await fakeUsersRespository.create({
      name: 'John tre',
      email: 'johntre@example.com',
      password: '1234567',
    });

    const loggedUser = await fakeUsersRespository.create({
      name: 'John qua',
      email: 'johnqua@example.com',
      password: '1234567',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
