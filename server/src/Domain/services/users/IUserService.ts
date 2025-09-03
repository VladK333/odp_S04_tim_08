import { UserDto } from "../../DTOs/users/UserDto";

export interface IUserService {
  create(userDto: UserDto): Promise<UserDto>;
  getById(id: number): Promise<UserDto>;
  update(userDto: UserDto): Promise<UserDto>;
}