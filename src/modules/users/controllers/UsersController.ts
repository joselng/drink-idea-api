import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      name,
      email,
      password,
      oldPassword,
    } = request.body;

    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const deleteUser = container.resolve(DeleteUserService);
    const user = await deleteUser.execute({ id });

    return response.json(user);
  }
}
