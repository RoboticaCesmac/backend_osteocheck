import { Router } from "express";
import professionalRouter from './context/professional/professional.routes'
import patientsRouter from './context/patients/patients.routes';

const router = Router();

router.use(professionalRouter);
router.use(patientsRouter);

export default router;