import { Router } from 'express';

import FavoritesController from '../controllers/FavoritesController';

const routes = Router();
const favoritesController = new FavoritesController();

routes.post('/', favoritesController.create);
routes.delete('/', favoritesController.delete);

export default routes;
