import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { createQuestionnaireController } from "./questionnaire.factory";

const questionnaireController = createQuestionnaireController();
const router = Router();

router.post('/questionnaire/next-question', authMiddleware(), questionnaireController.nextQuestion);

export default router;