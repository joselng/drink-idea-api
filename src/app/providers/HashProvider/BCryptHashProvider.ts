import { hash, compare } from 'bcryptjs';
import IHashProvider from '.';

export default class BCryptHashProvider implements IHashProvider {
  public async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public async generate(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
