import { Router } from "express";
import * as applicant from '../controllers/applicant';

const router = Router();

router.get('/', applicant.findAllApplicants);
router.get('/:id', applicant.findApplicantById);
router.post('/create', applicant.createApplicant)
router.put('/update/:id', applicant.updateApplicant);
router.delete('/delete/:id', applicant.deleteApplicant);

export default router;


