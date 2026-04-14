"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionnaireController = createQuestionnaireController;
const dbConnection_1 = require("../../database/dbConnection");
const patients_factory_1 = require("../patients/patients.factory");
const question_entity_1 = require("./entity/question.entity");
const questionnaire_entity_1 = require("./entity/questionnaire.entity");
const questionnaireResponse_entity_1 = require("./entity/questionnaireResponse.entity");
const questionnaireResult_entity_1 = require("./entity/questionnaireResult.entity");
const questionOption_entity_1 = require("./entity/questionOption.entity");
const questionnaire_controller_1 = require("./questionnaire.controller");
const questionnaire_service_1 = require("./questionnaire.service");
const jawAssessmentQuestionnaireRules_1 = require("./specificQuestionnaireRules/jawAssessmentQuestionnaireRules");
function createQuestionnaireController() {
    const appDataSource = dbConnection_1.AppDataSource;
    const questionnaireResultRepository = appDataSource.getRepository(questionnaireResult_entity_1.QuestionnaireResult);
    const questionRepository = dbConnection_1.AppDataSource.getRepository(question_entity_1.Question);
    const questionOptionRepository = dbConnection_1.AppDataSource.getRepository(questionOption_entity_1.QuestionOption);
    const questionnaireResponseRepository = dbConnection_1.AppDataSource.getRepository(questionnaireResponse_entity_1.QuestionnaireResponse);
    const questionnaireRepository = dbConnection_1.AppDataSource.getRepository(questionnaire_entity_1.Questionnaire);
    const patientsService = (0, patients_factory_1.createPatientsService)();
    const jawAssessmentQuestionnaireRules = new jawAssessmentQuestionnaireRules_1.JawAssessmentQuestionnaireRules(questionRepository, questionOptionRepository);
    const questionnaireService = new questionnaire_service_1.QuestionnaireService(patientsService, questionnaireRepository, questionRepository, questionnaireResponseRepository, appDataSource, jawAssessmentQuestionnaireRules, questionnaireResultRepository);
    return new questionnaire_controller_1.QuestionnaireController(questionnaireService);
}
