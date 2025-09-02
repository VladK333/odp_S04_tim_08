import { Request, Response, Router } from "express";
import { IUserService } from "../../Domain/services/users/IUserService";
import { UserDto } from "../../Domain/DTOs/users/UserDto";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";

export class UserController {
  public router: Router;
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.router = Router();
    this.userService = userService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/users", authenticate, authorize("admin"), this.getAllUsers.bind(this));
    this.router.post("/register", this.register.bind(this));
    this.router.post("/login", this.login.bind(this));
    this.router.post("/reset-messages/:id", authenticate, authorize("admin"), this.resetMessages.bind(this));
  }

  private async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getSviKorisnici();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  private async register(req: Request, res: Response) {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  private async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);

      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      res.status(200).json(user);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  private async resetMessages(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      await this.userService.resetMessages(userId);
      res.status(200).json({ message: "Messages reset successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}