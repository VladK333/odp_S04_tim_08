import { ChatDto } from "../../Domain/DTOs/chats/ChatDto";
import { Chat } from "../../Domain/models/Chat";
import { IChatRepository } from "../../Domain/repositories/chats/IChatRepository";
import { IChatService } from "../../Domain/services/chats/IChatService";

export class ChatService implements IChatService {
  public constructor(private chatRepository: IChatRepository) {}

  async create(chatDto: ChatDto): Promise<ChatDto> {
    const chat = new Chat(0, chatDto.name, chatDto.userId);
    const created = await this.chatRepository.create(chat);
    return new ChatDto(created.id, created.name, created.userId);
  }

  async getByUserId(userId: number): Promise<ChatDto[]> {
    const chats = await this.chatRepository.getByUserId(userId);
    return chats.map((chat) => new ChatDto(chat.id, chat.name, chat.userId));
  }

  async deleteById(id: number): Promise<boolean> {
    return this.chatRepository.deleteById(id);
  }
}
