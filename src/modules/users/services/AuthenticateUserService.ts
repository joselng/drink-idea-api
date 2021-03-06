import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { getRepository } from 'typeorm';

import HashProvider from '@app/providers/HashProvider';

import authConfig from '@app/config/auth';
import AppError from '@app/errors/AppError';
import Favorite from '@modules/favorites/entities/Favorite';
import User from '../entities/User';

import UsersRepository from '../repositories/UsersRepository';

interface Request {
  email: string;
  password?: string;
}

interface Response {
  token: string;
  user: User;
  favorites: number[];
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    if (!email || !password) {
      throw new AppError('Você deve preencher todos os campos');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Dados inválidos. Tente novamente!', 401);
    }

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Dados inválidos. Tente novamente!', 401);
    }

    delete user.password;

    const favoritesRepository = await getRepository(Favorite).find({ where: { userId: 1 }, select: ['drinkId'] });

    const favorites = favoritesRepository.map((favorite) => favorite.drinkId);

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ email: user.email, name: user.name }, secret, {
      subject: user.email,
      expiresIn,
    });
    return { user, token, favorites };
  }
}
