import { Router } from "express";
import * as applicant from '../controllers/applicant';
import { verifyToken, verifyRoles } from "../middleware/auth";

const router = Router();

router.get('/', [verifyToken, verifyRoles('ROLE_ADMIN', 'ROLE_USER')], applicant.findAllApplicants);
router.get('/:id', [verifyToken, verifyRoles('ROLE_ADMIN', 'ROLE_USER')], applicant.findApplicantById);
router.post('/create', applicant.createApplicant)
router.put('/update/:id', [verifyToken, verifyRoles('ROLE_ADMIN', 'ROLE_USER')], applicant.updateApplicant);
router.delete('/delete/:id', [verifyToken, verifyRoles('ROLE_ADMIN', 'ROLE_USER')], applicant.deleteApplicant);

export default router;