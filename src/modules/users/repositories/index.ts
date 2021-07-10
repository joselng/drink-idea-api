import { container } from 'tsyringe';

import IUsersRepository from './IUsersRepository';
import UsersRepository from './UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
