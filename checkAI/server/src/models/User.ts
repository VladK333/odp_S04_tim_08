export interface User {
  id?: number;
  email: string;
  password: string;
  type: string;
  firstName: string;
  lastName: string;
  imgSrc?: string;
  dateOfBirth: string;
  phoneNumber: string;
  messagesLeft?: number;
}
