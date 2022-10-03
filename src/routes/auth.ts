import { Router } from 'express';
import * as authController from '../controllers/auth';
import * as authMiddleware from '../middleware/auth';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login)
router.get('/me', authMiddleware.verifyToken, authController.getMe)
router.put('/updatedetails', authMiddleware.verifyToken, authController.updateUserDetails);
router.put('/updatepassword', authMiddleware.verifyToken, authController.updatePasword);

export default router;