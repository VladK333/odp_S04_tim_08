import { Request, Response } from 'express';
import { UserService } from '../../Services/UserService';
import bcrypt from 'bcrypt';

const userService = new UserService();

export class AuthController {
  static async signUp(req: Request, res: Response) {
    try {
      const { email, password, type, firstName, lastName, dateOfBirth, phoneNumber, imgSrc} = req.body;

      if (!email || !password || !type || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      await userService.createUser({email, password, type, firstName, lastName, dateOfBirth, phoneNumber, imgSrc});
      res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
      res.status(409).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          type: user.type,
          firstName: user.firstName,
          lastName: user.lastName,
          imgSrc: user.imgSrc || '/images/user.png',
          dateOfBirth: user.dateOfBirth,
          phoneNumber: user.phoneNumber,
          messagesLeft: user.messagesLeft ?? 50
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
