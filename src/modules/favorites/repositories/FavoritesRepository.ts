import { DeleteResult, getRepository, Repository } from 'typeorm';

import Favorite from '../entities/Favorite';
import IFavoritesRepository from './IFavoritesRepository';

interface FavoriteDTO {
  userId: number;
  drinkId: number;
}

export default class FavoritesRepository implements IFavoritesRepository {
  private ormRepository: Repository<Favorite>;

  constructor() {
    this.ormRepository = getRepository(Favorite);
  }

  public async create({ userId, drinkId }: FavoriteDTO): Promise<Favorite> {
    const favorite = this.ormRepository.create({
      userId,
      drinkId,
    });
    return this.ormRepository.save(favorite);
  }

  public async findByIds({ userId, drinkId }: FavoriteDTO): Promise<Favorite | undefined> {
    return this.ormRepository.findOne({
      where: {
        userId, drinkId,
      },
    });
  }

  public async save(favorite: Favorite): Promise<Favorite> {
    return this.ormRepository.save(favorite);
  }

  public async delete({ userId, drinkId }: FavoriteDTO): Promise<DeleteResult> {
    return this.ormRepository.delete({
      userId, drinkId,
    });
  }
}
