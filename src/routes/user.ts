import { Router } from 'express';
import * as authMiddleware from '../middleware/auth';
import * as userController from '../controllers/user';

const router = Router();

router.get('', [authMiddleware.verifyToken, authMiddleware.verifyRoles('ROLE_ADMIN')], userController.getUsers);
router.get('/:id', [authMiddleware.verifyToken, authMiddleware.verifyRoles('ROLE_ADMIN')], userController.getUserById)
router.post('/create', [authMiddleware.verifyToken, authMiddleware.verifyRoles('ROLE_ADMIN')], userController.createUser)
router.put('/update', [authMiddleware.verifyToken, authMiddleware.verifyRoles('ROLE_ADMIN')], userController.updateUser);
router.delete('/delete', [authMiddleware.verifyToken, authMiddleware.verifyRoles('ROLE_ADMIN')], userController.deleteUser);

export default router;