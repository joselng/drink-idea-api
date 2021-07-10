import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFavoriteService from '@modules/favorites/services/CreateFavoriteService';
import DeleteFavoriteService from '@modules/favorites/services/DeleteFavoriteService';

export default class FavoritesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { userId, drinkId } = request.body;
    const createFavorite = container.resolve(CreateFavoriteService);
    const favorite = await createFavorite.execute({ userId, drinkId });

    return response.json(favorite);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { userId, drinkId } = request.body;
    const deleteFavorite = container.resolve(DeleteFavoriteService);
    const favorite = await deleteFavorite.execute({ userId, drinkId });

    return response.json(favorite);
  }
}
