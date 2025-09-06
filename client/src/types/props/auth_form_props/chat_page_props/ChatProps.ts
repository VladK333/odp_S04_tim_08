import type { IChatAPIService } from "../../../../api/chats/IChatAPIService ";
import type { ILLMChatAPIService } from "../../../../api/llm/ILLMChatAPIService";
import type { IMessageAPIService } from "../../../../api/messages/IMessageAPIService";
import type { IUserAPIService } from "../../../../api/users/IUserAPIService";

export type ChatPageServices = {
  chatApi: IChatAPIService;
  messageApi: IMessageAPIService;
  llmApi: ILLMChatAPIService;
  userApi: IUserAPIService;
};