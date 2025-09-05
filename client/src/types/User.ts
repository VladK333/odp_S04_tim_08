export interface User {
  id?: number;
  fullname: string;
  email: string;
  isPremium: boolean;
  messagesLeft: number;
}
export const users: User[] = []; // privremeno
