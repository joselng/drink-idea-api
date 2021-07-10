import { DeleteResult } from 'typeorm';
import User from '../entities/User';

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export default interface IUsersRepository {
  create(data: UserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  save(data: User): Promise<User>;
  delete(id: number): Promise<DeleteResult>;
}
