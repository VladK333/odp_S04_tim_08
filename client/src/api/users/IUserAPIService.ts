import type { UserDto } from "../../models/users/UserDto";

export interface IUserAPIService {
  getUserById(id: number, token: string): Promise<UserDto | undefined>;
}
