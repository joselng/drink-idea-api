import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute(id: number): Promise<DeleteResult> {
    const user = await this.usersRepository.delete(id);

    return user;
  }
}
