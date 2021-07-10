import { inject, injectable } from 'tsyringe';

import AppError from '@app/errors/AppError';
import HashProvider from '@app/providers/HashProvider';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('O endereço de email já está em uso.');
    }
    const hashedPassword = await this.hashProvider.generate(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}
