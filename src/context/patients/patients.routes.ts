import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import patientsRequest from "./request/patients.request";
import { createPatientsController } from "./patients.factory";

const patientsController = createPatientsController();

const router = Router();

router.post('/patients', authMiddleware(), validateRequest(patientsRequest.create), patientsController.create);

export default router;