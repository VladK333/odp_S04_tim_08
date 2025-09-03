import { Request, Response, Router } from "express";
import { IMessageService } from "../../Domain/services/messages/IMessageService";
import { MessageDto } from "../../Domain/DTOs/messages/MessageDto";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";

export class MessageController {
  private router: Router;
  private messageService: IMessageService;

  constructor(messageService: IMessageService) {
    this.router = Router();
    this.messageService = messageService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/messages", authenticate, this.createMessage.bind(this));
    this.router.get("/messages/:chatId", authenticate, this.getByChatId.bind(this));
    this.router.delete("/messages/:chatId", authenticate, this.deleteByChatId.bind(this));
  }

  private async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const { text, isSentByAI, sentTime, chatId } = req.body;
      const id = req.user?.id ?? 0;

      const message = await this.messageService.create(
        new MessageDto(0, text, isSentByAI, sentTime, chatId),
        id
      );
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async getByChatId(req: Request, res: Response): Promise<void> {
    try {
      const { chatId } = req.params;
      const messages = await this.messageService.getByChatId(parseInt(chatId));
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async deleteByChatId(req: Request, res: Response): Promise<void> {
    try {
      const { chatId } = req.params;
      const deleted = await this.messageService.deleteByChatId(parseInt(chatId));
      res
        .status(deleted ? 200 : 404)
        .json({ success: deleted, message: deleted ? "Messages has been deleted" : "Messages not found" });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
