import { Router } from 'express';

import favoritesRouter from './favorites.routes';

const routes = Router();

routes.use('/favorites', favoritesRouter);

export default routes;
