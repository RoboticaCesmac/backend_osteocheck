import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createQuestionnaireController } from "./questionnaire.factory";
import questionnaireRequest from "./request/questionnaire.request";

const questionnaireController = createQuestionnaireController();
const router = Router();

router.post('/questionnaire/next-question', authMiddleware(), questionnaireController.nextQuestion);
router.get('/questionnaire/progress', authMiddleware(), validateRequest(questionnaireRequest.getQuestionnaireProgress), questionnaireController.getQuestionnaireProgress);

export default router;