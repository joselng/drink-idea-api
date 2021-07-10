import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import FavoritesRepository from '../repositories/FavoritesRepository';

interface Request {
  userId: number;
  drinkId: number;
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: FavoritesRepository,
  ) {}

  public async execute({ userId, drinkId }: Request): Promise<DeleteResult> {
    const user = await this.favoritesRepository.delete({ userId, drinkId });

    return user;
  }
}
