import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createQuestionnaireController } from "./questionnaire.factory";
import questionnaireRequest from "./request/questionnaire.request";

const questionnaireController = createQuestionnaireController();
const router = Router();

router.post('/questionnaire/next-question', authMiddleware(), questionnaireController.nextQuestion);
router.post('/questionnaire/previous-question', authMiddleware(), questionnaireController.previousQuestion);
router.get('/questionnaire/progress', authMiddleware(), validateRequest(questionnaireRequest.getQuestionnaireProgress), questionnaireController.getQuestionnaireProgress);
router.post('/questionnaire/:id/pdf', authMiddleware(), validateRequest(questionnaireRequest.generatePdf), questionnaireController.generatePdf);

export default router;