import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

// ruta za registraciju
router.post('/signup', AuthController.signUp);

// ruta za login (kasnije)
//router.post('/login', AuthController.login);

export default router;
