import express from 'express';
import cors from 'cors';
import { IChatService } from './Domain/services/chats/IChatService';
import { ChatService } from './Services/chat/ChatService';
import { IChatRepository } from './Domain/repositories/chats/IChatRepository';
import { ChatRepository } from './Database/repositories/chats/ChatRepository';
import { UserRepository } from './Database/repositories/users/UserRepository';
import { IUserRepository } from './Domain/repositories/users/IUserRepository';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { IUserService } from './Domain/services/users/IUserService';
import { AuthService } from './Services/auth/AuthService';
import { UserService } from './Services/users/UserService';
import { AuthController } from './WebAPI/controllers/AuthController';
import { UserController } from './WebAPI/controllers/UserController';
import { IMessageService } from './Domain/services/messages/IMessageService';
import { MessageService } from './Services/messages/MessageService';
import { IMessageRepository } from './Domain/repositories/messages/IMessageRepository';
import { MessageRepository } from './Database/repositories/messages/MessageRepository';
import { ChatController } from './WebAPI/controllers/ChatController';
import { MessageController } from './WebAPI/controllers/MessageController';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const chatRepository: IChatRepository = new ChatRepository();
const messageRepository: IMessageRepository = new MessageRepository();

// Services
const authService: IAuthService = new AuthService(userRepository);
const userService: IUserService = new UserService(userRepository);
const chatService: IChatService = new ChatService(chatRepository)
const messageService: IMessageService = new MessageService(messageRepository, userService);

// WebAPI routes
const authController = new AuthController(authService);
const userController = new UserController(userService);
const chatController = new ChatController(chatService);
const messageController = new MessageController(messageService);

// Registering routes
app.use('/api/v1', authController.getRouter());
app.use('/api/v1', userController.getRouter());
app.use('/api/v1', chatController.getRouter());
app.use('/api/v1', messageController.getRouter());

export default app;