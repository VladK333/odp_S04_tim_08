import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10", 10);

  public constructor(private userRepository: IUserRepository) {}

  async login(username: string, password: string): Promise<UserDto> {
    const user = await this.userRepository.getByEmail(username);

    if (user.id !== 0 && await bcrypt.compare(password, user.password)) {
      return new UserDto(
        user.id,
        user.fullname,
        user.email,
        user.password,  
        user.isPremium,
        user.messagesLeft,
        user.firstMessageSentForPeriod
      );
    }

    return new UserDto(); 
  }

  async register(fullname: string, email: string, password: string, isPremium: boolean): Promise<UserDto> {
    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser.id !== 0) {
      return new UserDto(); 
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const newUser = await this.userRepository.create(
      new User(0, fullname, email, hashedPassword, isPremium, 50, Date.now())
    );

    if (newUser.id !== 0) {
      return new UserDto(
        newUser.id,
        newUser.fullname,
        newUser.email,
        newUser.password, 
        newUser.isPremium,
        newUser.messagesLeft,
        newUser.firstMessageSentForPeriod
      );
    }

    return new UserDto(); 
  }
}
