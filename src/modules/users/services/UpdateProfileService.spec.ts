import AppError from '@shared/errors/AppError';

import FakeHashrovider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashrovider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashrovider();

    updateProfile = new UpdateProfileService(
      fakeUsersRespository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John tre',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John tre');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to update the profile from non-existing-user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'test',
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRespository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const user = await fakeUsersRespository.create({
      name: 'teste',
      email: 'teste@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John tre',
      email: 'johntre@example.com',
      old_password: '1234567',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without oldpassword', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John tre',
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong oldpassword', async () => {
    const user = await fakeUsersRespository.create({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John tre',
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
