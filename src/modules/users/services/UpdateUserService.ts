import { injectable, inject } from 'tsyringe';

import AppError from '@app/errors/AppError';
import HashProvider from '@app/providers/HashProvider';
import UsersRepository from '../repositories/UsersRepository';
import User from '../entities/User';

interface Request {
  userId: number;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('usuário não encontrado.', 401);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('e-mail já está em uso.');
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new AppError(
        'Você precisa informar o antigo password para altera-lo',
      );
    } else if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compare(
        oldPassword,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError('O password informado não está correto.');
      } else {
        user.password = await this.hashProvider.generate(password);
      }
    }

    return this.usersRepository.save(user);
  }
}
