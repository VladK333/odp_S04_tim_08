export default interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phoneNumber: string;
  type: 'regular' | 'premium';
  imgSrc: string;
  messagesLeft: number;
  firstMessageTime?: number;
}