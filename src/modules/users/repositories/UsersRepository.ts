import { DeleteResult, getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from './IUsersRepository';

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: UserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findById(id: number): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }
}
