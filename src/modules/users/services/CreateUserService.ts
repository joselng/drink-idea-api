import { inject, injectable } from 'tsyringe';
import validator from 'validator';

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
    if (!validator.isEmail(email)) {
      throw new AppError('Você deve fornecer um endereço de email válido.');
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('O endereço de email já está em uso.');
    }

    if (!name || !email || !password) {
      throw new AppError('Você deve preencher todos os campos');
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
