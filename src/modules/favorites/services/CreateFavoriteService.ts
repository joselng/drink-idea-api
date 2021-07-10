import { inject, injectable } from 'tsyringe';

import AppError from '@app/errors/AppError';

import Favorite from '../entities/Favorite';
import FavoritesRepository from '../repositories/FavoritesRepository';

interface Request {
  userId: number;
  drinkId: number;
}

@injectable()
export default class CreateFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: FavoritesRepository,
  ) {}

  public async execute({ userId, drinkId }: Request): Promise<Favorite> {
    const checkFavorite = await this.favoritesRepository.findByIds({ userId, drinkId });

    if (checkFavorite) {
      throw new AppError('O endereço de email já está em uso.');
    }

    const user = await this.favoritesRepository.create({
      userId,
      drinkId,
    });
    return user;
  }
}
