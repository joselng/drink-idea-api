import { Router } from 'express';

import usersRoutes from '../../modules/users/routes';
import favoritesRoutes from '../../modules/favorites/routes';

const routes = Router();

routes.use(usersRoutes);
routes.use(favoritesRoutes);

export default routes;
