import { Router } from 'express';
import { authController } from "../../controllers/authController.js"

const router = Router();

router.post('/login', authController.authenticate);

export { router as authRoutes };