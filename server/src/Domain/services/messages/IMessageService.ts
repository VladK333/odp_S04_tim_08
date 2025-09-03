import { MessageDto } from "../../DTOs/messages/MessageDto";

export interface IMessageService {
  create(messageDto: MessageDto): Promise<MessageDto>;
  getByChatId(chatId: number): Promise<MessageDto[]>;
  deleteByChatId(chatId: number): Promise<boolean>;
}