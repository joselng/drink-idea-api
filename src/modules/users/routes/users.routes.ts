import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const routes = Router();
const usersController = new UsersController();

routes.post('/', usersController.create);
routes.delete('/', usersController.delete);

export default routes;
