import { Router } from 'express';
import * as authController from '../controllers/auth';
import {verifyToken} from '../middleware/auth';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login)
router.get('/me', verifyToken, authController.getMe)
router.put('/updatedetails', verifyToken, authController.updateUserDetails);
router.put('/updatepassword', verifyToken, authController.updatePasword);

export default router;