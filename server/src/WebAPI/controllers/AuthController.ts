import { Request, Response, Router } from "express";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import jwt from "jsonwebtoken";

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/auth/login", this.login.bind(this));
    this.router.post("/auth/register", this.register.bind(this));
  }

  /**
   * POST /api/v1/auth/login
   * Auth user with provided credentials
   */
  private async login(req: Request, res: Response): Promise<void> {
    try {
      const { email , password } = req.body;

      // const rezultat = validacijaPodatakaAuth(username, password);
      // if (!rezultat.uspesno) {
      //   res.status(400).json({ success: false, message: rezultat.poruka });
      //   return;
      // }

      const result = await this.authService.login(email, password);

      if (result.id !== 0) {
        const token = jwt.sign(
          {
            id: result.id,
            email: result.email,
            isPremium: result.isPremium,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res
          .status(200)
          .json({ success: true, message: "Login success", data: token });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials provided" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  /**
   * POST /api/v1/auth/register
   * Registers new user with provided credentials
   */
  private async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullname, email, password, isPremium } = req.body;
      // const rezultat = validacijaPodatakaAuth(username, password);

      // if (!rezultat.uspesno) {
      //   res.status(400).json({ success: false, message: rezultat.poruka });
      //   return;
      // }

      const result = await this.authService.register(fullname, email, password, isPremium);

      if (result.id !== 0) {
        const token = jwt.sign(
          {
            id: result.id,
            username: result.fullname,
            email: result.email,
            isPremium: result.isPremium,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res
          .status(201)
          .json({ success: true, message: "Created account successfully", data: token });
      } else {
        res.status(401).json({
          success: false,
          message: "Email is already in use",
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
