"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("../../middleware/authenticate.middleware");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const questionnaire_factory_1 = require("./questionnaire.factory");
const questionnaire_request_1 = __importDefault(require("./request/questionnaire.request"));
const questionnaireController = (0, questionnaire_factory_1.createQuestionnaireController)();
const router = (0, express_1.Router)();
router.post('/questionnaire/next-question', (0, authenticate_middleware_1.authMiddleware)(), questionnaireController.nextQuestion);
router.get('/questionnaire/progress', (0, authenticate_middleware_1.authMiddleware)(), (0, validateRequest_middleware_1.validateRequest)(questionnaire_request_1.default.getQuestionnaireProgress), questionnaireController.getQuestionnaireProgress);
router.post('/questionnaire/:id/pdf', (0, authenticate_middleware_1.authMiddleware)(), (0, validateRequest_middleware_1.validateRequest)(questionnaire_request_1.default.generatePdf), questionnaireController.generatePdf);
exports.default = router;
