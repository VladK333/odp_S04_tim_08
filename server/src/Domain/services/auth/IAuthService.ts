import { UserDto } from "../../DTOs/users/UserDto";

export interface IAuthService {
   login(username: string, password: string): Promise<UserDto>;
   register(fullname: string, email: string, password: string, isPremium: boolean): Promise<UserDto>
}
