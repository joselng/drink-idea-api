import { Router } from 'express';

import ensureAuthenticated from '@app/middlewares/ensureAuthenticated';

import FavoritesController from '../controllers/FavoritesController';

const routes = Router();
const favoritesController = new FavoritesController();

routes.use(ensureAuthenticated);

routes.post('/', favoritesController.create);
routes.delete('/', favoritesController.delete);

export default routes;
