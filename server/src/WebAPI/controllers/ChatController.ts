import { Request, Response, Router } from "express";
import { IChatService } from "../../Domain/services/chats/IChatService";
import { ChatDto } from "../../Domain/DTOs/chats/ChatDto";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";

export class ChatController {
  private router: Router;
  private chatService: IChatService;

  constructor(chatService: IChatService) {
    this.router = Router();
    this.chatService = chatService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/chats", authenticate, this.createChat.bind(this));
    this.router.get("/chats/:userId", authenticate, this.getUserChats.bind(this));
    this.router.delete("/chats/:id", authenticate, this.deleteChat.bind(this));
  }

  private async createChat(req: Request, res: Response): Promise<void> {
    try {
      const { name, userId } = req.body;
      const newChat = await this.chatService.create(new ChatDto(0, name, userId));
      res.status(201).json(newChat);
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async getUserChats(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const chats = await this.chatService.getByUserId(parseInt(userId));
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async deleteChat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.chatService.deleteById(parseInt(id));
      res
        .status(deleted ? 200 : 404)
        .json({ success: deleted, message: deleted ? "Chat has been deleted" : "Chat not found" });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
