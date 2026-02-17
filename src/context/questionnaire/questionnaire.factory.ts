import { AppDataSource } from "../../database/dbConnection";
import { createPatientsService } from "../patients/patients.factory";
import { Question } from "./entity/question.entity";
import { Questionnaire } from "./entity/questionnaire.entity";
import { QuestionnaireResponse } from "./entity/questionnaireResponse.entity";
import { QuestionnaireResult } from "./entity/questionnaireResult.entity";
import { QuestionOption } from "./entity/questionOption.entity";
import { QuestionnaireController } from "./questionnaire.controller";
import { QuestionnaireService } from "./questionnaire.service";
import { JawAssessmentQuestionnaireRules } from "./specificQuestionnaireRules/jawAssessmentQuestionnaireRules";

export function createQuestionnaireController() {
  const appDataSource = AppDataSource;
  const questionnaireResultRepository = appDataSource.getRepository(QuestionnaireResult);
  const questionRepository = AppDataSource.getRepository(Question);
  const questionOptionRepository = AppDataSource.getRepository(QuestionOption);
  const questionnaireResponseRepository = AppDataSource.getRepository(QuestionnaireResponse);
  const questionnaireRepository = AppDataSource.getRepository(Questionnaire);
  const patientsService = createPatientsService();
  const jawAssessmentQuestionnaireRules = new JawAssessmentQuestionnaireRules(questionRepository, questionOptionRepository);
  const questionnaireService = new QuestionnaireService(patientsService, questionnaireRepository, questionRepository, questionnaireResponseRepository, appDataSource, jawAssessmentQuestionnaireRules, questionnaireResultRepository);
  return new QuestionnaireController(questionnaireService);
}