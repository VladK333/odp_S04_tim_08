import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IUserService } from "../../Domain/services/users/IUserService";

export class UserService implements IUserService {
  public constructor(private userRepository: IUserRepository) {}

  async create(userDto: UserDto): Promise<UserDto> {
    const user = new User(
      0,
      userDto.fullname,
      userDto.email,
      userDto.password,
      userDto.isPremium,
      userDto.messagesLeft,
      userDto.firstMessageSentForPeriod
    );
    const created = await this.userRepository.create(user);
    return new UserDto(
      created.id,
      created.fullname,
      created.email,
      created.password,
      created.isPremium,
      created.messagesLeft,
      created.firstMessageSentForPeriod
    );
  }

  async getById(id: number): Promise<UserDto> {
    const user = await this.userRepository.getById(id);
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

  async update(userDto: UserDto): Promise<UserDto> {
    const user = new User(
      userDto.id,
      userDto.fullname,
      userDto.email,
      userDto.password,
      userDto.isPremium,
      userDto.messagesLeft,
      userDto.firstMessageSentForPeriod
    );
    const updated = await this.userRepository.update(user);
    return new UserDto(
      updated.id,
      updated.fullname,
      updated.email,
      updated.password,
      updated.isPremium,
      updated.messagesLeft,
      updated.firstMessageSentForPeriod
    );
  }
}
