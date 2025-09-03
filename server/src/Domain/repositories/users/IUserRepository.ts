import { User } from "../../models/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  getById(id: number): Promise<User>;
  getByUsername(usernamme: string): Promise<User>;
  update(user: User): Promise<User>;
}