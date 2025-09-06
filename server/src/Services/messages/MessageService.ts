import { MESSAGE_LIMIT } from "../../Domain/constants/message";
import { MessageDto } from "../../Domain/DTOs/messages/MessageDto";
import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { Message } from "../../Domain/models/Message";
import { IMessageRepository } from "../../Domain/repositories/messages/IMessageRepository";
import { IMessageService } from "../../Domain/services/messages/IMessageService";
import { IUserService } from "../../Domain/services/users/IUserService";

export class MessageService implements IMessageService {
  public constructor(
    private messageRepository: IMessageRepository,
    private userService: IUserService
  ) {}

  async create(messageDto: MessageDto, userId: number): Promise<MessageDto> {
    const message = new Message(
      0,
      messageDto.text,
      messageDto.isSentByAI,
      messageDto.sentTime,
      messageDto.chatId
    );

    const user = await this.userService.getById(userId);

    if (user.id === 0) return new MessageDto();

    if (user.isPremium === false) {
      const currentTime: number = Date.now() / 1000; // unix timestamp in seconds
      const is24hLimitPassed: boolean =
        Math.abs(user.firstMessageSentForPeriod - currentTime) <= 24 * 60 * 60; // ???

      if (user.messagesLeft - 1 < 0 || !is24hLimitPassed)
        return new MessageDto();

      if (is24hLimitPassed) {
        user.messagesLeft = MESSAGE_LIMIT;
        user.firstMessageSentForPeriod = currentTime;
      }
    }

    const created = await this.messageRepository.create(message);

    if (created.id === 0) return new MessageDto();

    // update user message left
    await this.userService.update(
      new UserDto(
        user.id,
        user.fullname,
        user.email,
        user.password,
        user.isPremium,
        user.messagesLeft - 1,
        user.firstMessageSentForPeriod
      )
    );

    return new MessageDto(
      created.id,
      created.text,
      created.isSentByAI,
      created.sentTime,
      created.chatId
    );
  }

  async getByChatId(chatId: number): Promise<MessageDto[]> {
    const messages = await this.messageRepository.getByChatId(chatId);
    return messages.map(
      (m) => new MessageDto(m.id, m.text, m.isSentByAI, m.sentTime, m.chatId)
    );
  }

  async deleteByChatId(chatId: number): Promise<boolean> {
    return this.messageRepository.deleteByChatId(chatId);
  }
}
