import { Request, Response, Router } from "express";
import { IUserService } from "../../Domain/services/users/IUserService";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { UserDto } from "../../Domain/DTOs/users/UserDto";

export class UserController {
  private router: Router;
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.router = Router();
    this.userService = userService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/users/:id", authenticate, this.getUserById.bind(this));
  }

  /**
   * GET /api/v1/users/:id
   * Get a user by ID
   */
  private async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(parseInt(id));

      if (!user || user.id === 0) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
