import { Router } from 'express';
import { verifyRoles, verifyToken } from '../middleware/auth';
import * as userController from '../controllers/user';

const router = Router();

router.get('', [verifyToken, verifyRoles('ROLE_ADMIN')], userController.getUsers);
router.get('/:id', [verifyToken, verifyRoles('ROLE_ADMIN')], userController.getUserById)
router.post('/create', [verifyToken, verifyRoles('ROLE_ADMIN')], userController.createUser)
router.put('/update/:id', [verifyToken, verifyRoles('ROLE_ADMIN')], userController.updateUser);
router.delete('/delete/:id', [verifyToken, verifyRoles('ROLE_ADMIN')], userController.deleteUser);

export default router;