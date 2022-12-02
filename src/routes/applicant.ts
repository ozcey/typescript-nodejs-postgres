import { Router } from "express";
import * as applicant from '../controllers/applicant';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/', verifyToken, applicant.findAllApplicants);
router.get('/:id', verifyToken, applicant.findApplicantById);
router.post('/create', verifyToken, applicant.createApplicant)
router.put('/update/:id', verifyToken, applicant.updateApplicant);
router.delete('/delete/:id', verifyToken, applicant.deleteApplicant);

export default router;