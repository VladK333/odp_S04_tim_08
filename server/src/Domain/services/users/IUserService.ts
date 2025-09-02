import { UserDto } from "../../DTOs/users/UserDto";
import { User } from "../../models/User";

export interface IUserService {
  /**
  * Vraca listu svih korisnika u sistemu.
  * @returns Podatke o korisnicima u vidu liste.
  */
  getSviKorisnici(): Promise<UserDto[]>;

  register(user: User): Promise<User>;
  login(email: string, password: string): Promise<User | null>;
  resetMessages(userId: number): Promise<void>;

}