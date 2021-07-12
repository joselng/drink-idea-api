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
    if (!userId || !drinkId) {
      throw new AppError('Você deve preencher todos os campos');
    }

    const favorite = await this.favoritesRepository.create({
      userId,
      drinkId,
    });

    return favorite;
  }
}
