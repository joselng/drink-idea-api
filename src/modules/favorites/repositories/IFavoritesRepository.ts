import { DeleteResult } from 'typeorm';
import Favorite from '../entities/Favorite';

interface FavoriteDTO {
  userId: number;
  drinkId: number;
}

export default interface IUsersRepository {
  create(data: FavoriteDTO): Promise<Favorite>;
  findByIds(data: FavoriteDTO): Promise<Favorite | undefined>;
  save(data: Favorite): Promise<Favorite>;
  delete(data: FavoriteDTO): Promise<DeleteResult>;
}
