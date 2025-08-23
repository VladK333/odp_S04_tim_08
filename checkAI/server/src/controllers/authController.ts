import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class AuthController {

    static async signUp(req: Request, res: Response) {
        try {
            const { email, password, type } = req.body;

            if (!email || !password || !type) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            await userService.createUser({ email, password, type });
            res.status(201).json({ message: 'User created successfully' });
        } catch (error: any) {
            res.status(409).json({ message: error.message });
        }
    }
}
