import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.status(201).json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const deleteUser = container.resolve(DeleteUserService);
    const user = await deleteUser.execute(id);

    return response.json(user);
  }
}
