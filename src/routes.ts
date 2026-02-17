import { Router } from "express";
import professionalRouter from './context/professional/professional.routes'
import patientsRouter from './context/patients/patients.routes';
import questionnaireRouter from './context/questionnaire/questionnaire.routes';

const router = Router();

router.use(questionnaireRouter);
router.use(professionalRouter);
router.use(patientsRouter);

export default router;