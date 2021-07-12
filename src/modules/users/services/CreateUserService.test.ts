import { createConnection } from 'typeorm';

import AppError from '@app/errors/AppError';
import BCryptHashProvider from '@app/providers/HashProvider/BCryptHashProvider';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';
import User from '../entities/User';

let usersRepository: UsersRepository;
let hashProvider: BCryptHashProvider;
let createUserService: CreateUserService;
let deleteUserService: DeleteUserService;

describe('CreateUser', () => {
  beforeAll(async () => {
    await createConnection();
  });

  beforeEach(() => {
    hashProvider = new BCryptHashProvider();
    usersRepository = new UsersRepository();
    createUserService = new CreateUserService(usersRepository, hashProvider);
    deleteUserService = new DeleteUserService(usersRepository);
  });

  it('should create a user', async () => {
    const generateHash = jest.spyOn(hashProvider, 'generate');

    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(generateHash).toHaveBeenCalledWith('123456');
    expect(user).toBeInstanceOf(User);

    await deleteUserService.execute(user.id);
  });

  it('should not be able to create two users with the same email.', async () => {
    const email = 'jonhdoe2@example.com';

    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Jonh Doe 2',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await deleteUserService.execute(user.id);
  });

  it('should not be able to register a user without a valid email address', async () => {
    await expect(
      createUserService.execute({
        name: 'Jonh Doe',
        email: '',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register a user with some blank data', async () => {
    await expect(
      createUserService.execute({
        name: '',
        email: 'jonhdoe2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
