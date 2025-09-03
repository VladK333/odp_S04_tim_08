import type { User } from "../../types/User";

export interface IUserAPIService {
  getUserById(id: number, token: string): Promise<User | undefined>;
}
