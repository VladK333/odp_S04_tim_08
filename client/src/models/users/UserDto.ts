export interface UserDto {
  id: number;
  fullname: string;
  email: string;
  password: string;
  isPremium: boolean;
  messagesLeft: number;
  firstMessageSentForPeriod: number;
}