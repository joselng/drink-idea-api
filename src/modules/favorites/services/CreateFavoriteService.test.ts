import { createConnection } from 'typeorm';

import AppError from '@app/errors/AppError';
import FavoritesRepository from '../repositories/FavoritesRepository';
import DeleteFavoriteService from './DeleteFavoriteService';
import CreateFavoriteService from './CreateFavoriteService';
import Favorite from '../entities/Favorite';

let favoritesRepository: FavoritesRepository;
let deleteFavoriteService: DeleteFavoriteService;
let createFavoriteService: CreateFavoriteService;

describe('CreateFavorite', () => {
  beforeAll(async () => {
    await createConnection();
  });

  beforeEach(() => {
    favoritesRepository = new FavoritesRepository();
    deleteFavoriteService = new DeleteFavoriteService(favoritesRepository);
    createFavoriteService = new CreateFavoriteService(favoritesRepository);
  });

  it('should create a user', async () => {
    const favorite = await createFavoriteService.execute({
      userId: 1,
      drinkId: 1,
    });

    expect(favorite).toBeInstanceOf(Favorite);

    await deleteFavoriteService.execute(favorite.userId, favorite.drinkId);
  });

  it('should not be able to register a favorite with some blank data', async () => {
    await expect(
      createFavoriteService.execute({
        userId: 1,
        drinkId: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
