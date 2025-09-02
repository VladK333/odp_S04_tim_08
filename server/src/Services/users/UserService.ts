import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { UserRole } from "../../Domain/enums/UserRole";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IUserService } from "../../Domain/services/users/IUserService";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 10;

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getSviKorisnici(): Promise<UserDto[]> {
    const users = await this.userRepository.getAll();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      role: user.role,
      messagesLeft: user.messagesLeft,
    }));
  }

  async register(user: User): Promise<User> {
    // Hash lozinke
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);

    // Postavi default vrednosti za role
    if (!user.role) user.role = UserRole.Regular;

    user.messagesLeft = user.role === UserRole.Premium ? Infinity : 50;
    user.firstMessageTime = new Date();

    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    // Proveri da li treba resetovati messagesLeft (24h pravilo)
    if (user.role !== UserRole.Premium && user.firstMessageTime) {
      const resetTime = new Date(user.firstMessageTime.getTime() + 24 * 60 * 60 * 1000);
      if (new Date() > resetTime) {
        user.messagesLeft = 50;
        user.firstMessageTime = new Date();
        await this.userRepository.update(user);
      }
    }

    return user;
  }

  async resetMessages(userId: number): Promise<void> {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new Error("User not found");

    user.messagesLeft = user.role === UserRole.Premium ? Infinity : 50;
    user.firstMessageTime = new Date();
    await this.userRepository.update(user);
  }
}