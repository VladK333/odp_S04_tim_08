import { MessageDto } from "../../Domain/DTOs/messages/MessageDto";
import { Message } from "../../Domain/models/Message";
import { IMessageRepository } from "../../Domain/repositories/messages/IMessageRepository";
import { IMessageService } from "../../Domain/services/messages/IMessageService";

export class MessageService implements IMessageService {
  public constructor(private messageRepository: IMessageRepository) {}

  async create(messageDto: MessageDto): Promise<MessageDto> {
    const message = new Message(
      0,
      messageDto.text,
      messageDto.isSentByAI,
      messageDto.sentTime,
      messageDto.chatId
    );

    // proveru korisnika jel premium ako nije, onda proveri limit i azuriraj timestamp 
    // po potrebi...

    const created = await this.messageRepository.create(message);
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
      (m) =>
        new MessageDto(m.id, m.text, m.isSentByAI, m.sentTime, m.chatId)
    );
  }

  async deleteByChatId(chatId: number): Promise<boolean> {
    return this.messageRepository.deleteByChatId(chatId);
  }
}
