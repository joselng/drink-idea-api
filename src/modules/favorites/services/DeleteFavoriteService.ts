import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import AppError from '@app/errors/AppError';

import FavoritesRepository from '../repositories/FavoritesRepository';

@injectable()
export default class DeleteFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: FavoritesRepository,
  ) {}

  public async execute(userId: number, drinkId: number): Promise<DeleteResult> {
    if (!userId || !drinkId) {
      throw new AppError('Você deve preencher todos os campos');
    }

    const favorite = await this.favoritesRepository.delete({ userId, drinkId });

    return favorite;
  }
}
