import { createConnection } from 'typeorm';

import AppError from '@app/errors/AppError';
import BCryptHashProvider from '@app/providers/HashProvider/BCryptHashProvider';
import UsersRepository from '../repositories/UsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';

let hashProvider: BCryptHashProvider;
let usersRepository: UsersRepository;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
let deleteUserService: DeleteUserService;

describe('AuthenticateUser', () => {
  beforeAll(async () => {
    await createConnection();
  });

  beforeEach(() => {
    hashProvider = new BCryptHashProvider();
    usersRepository = new UsersRepository();
    createUserService = new CreateUserService(usersRepository, hashProvider);
    deleteUserService = new DeleteUserService(usersRepository);
    authenticateUserService = new AuthenticateUserService(usersRepository, hashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe3@example.com',
      password: '123456',
    });

    const login = await authenticateUserService.execute({
      email: 'jonhdoe3@example.com',
      password: '123456',
    });

    expect(login).toHaveProperty('token');
    expect(login).toHaveProperty('user');
    expect(login.user).toEqual(user);

    await deleteUserService.execute(user.id);
  });

  it('should not be able to authenticate with non existing user.', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'wrong@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await deleteUserService.execute(user.id);
  });

  it('should not be able to authenticate with non correct password.', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await deleteUserService.execute(user.id);
  });
});
