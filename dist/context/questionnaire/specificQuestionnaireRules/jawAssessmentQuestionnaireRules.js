"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JawAssessmentQuestionnaireRules = void 0;
const typeorm_1 = require("typeorm");
const httpResponses_1 = require("../../../utils/httpResponses");
const questionnaireResultType_enum_1 = require("../enum/questionnaireResultType.enum");
const questionnaireType_enum_1 = require("../enum/questionnaireType.enum");
class JawAssessmentQuestionnaireRules {
    constructor(questionRepository, questionOptionRepository) {
        this.orchestrateQuestionRule = async (questionId, questionOptionsIds) => {
            const question = await this.questionRepository.findOne({
                relations: {
                    group: true,
                },
                where: {
                    id: questionId,
                    group: {
                        questionnaire: {
                            type: questionnaireType_enum_1.QuestionnaireType.JawAssessment,
                        }
                    }
                },
            });
            const questionOptions = await this.questionOptionRepository.find({
                where: {
                    id: (0, typeorm_1.In)(questionOptionsIds),
                },
            });
            if (!question) {
                throw httpResponses_1.HttpResponse.notFound({
                    message: 'Essa questão não foi encontrada',
                });
            }
            if (question.group.order === 5 && question.order === 0) {
                return this.symptomsAndAlertsQuestionRule({
                    question,
                    questionOptions,
                });
            }
            if (question.group.order === 3 && question.order === 1) {
                return await this.diagnosisCriteriaQuestionRule({
                    question,
                    questionOptions,
                });
            }
            if (question.group.order === 7 && question.order === 0) {
                return this.stageZeroAlertsQuestionRule({
                    question,
                    questionOptions,
                });
            }
            return this.terminalOptions(question, questionOptions);
        };
        this.terminalOptions = (question, questionOptions) => {
            if (question.group.order === 0 && question.order === 0 && questionOptions.find(qo => qo.isTerminal === true && qo.order === 1)) {
                return { isTerminal: true, questionnaireResultType: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmInsignificantRisk };
            }
            if ((question.group.order === 6 && question.order === 0) || (question.group.order === 3 && question.order === 1)) {
                const finalResult = { isTerminal: true, questionnaireResultType: questionnaireResultType_enum_1.QuestionnaireResultType.StageThree };
                if (questionOptions.find(qo => qo.order === 0)) {
                    finalResult.questionnaireResultType = questionnaireResultType_enum_1.QuestionnaireResultType.StageOne;
                }
                if (questionOptions.find(qo => qo.order === 1)) {
                    finalResult.questionnaireResultType = questionnaireResultType_enum_1.QuestionnaireResultType.StageTwo;
                }
                return finalResult;
            }
            return null;
        };
        this.symptomsAndAlertsQuestionRule = (rulePayload) => {
            if (rulePayload.questionOptions.length > 1) {
                return {
                    isTerminal: true,
                    questionnaireResultType: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmSuspectionOnStageZero,
                };
            }
            return {
                isTerminal: true,
                questionnaireResultType: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmRisk,
            };
        };
        this.diagnosisCriteriaQuestionRule = async (rulePayload) => {
            if (rulePayload.questionOptions.length < 3) {
                return {
                    isTerminal: true,
                    questionnaireResultType: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmRisk,
                };
            }
            const nextQuestion = await this.questionRepository.findOne({
                where: {
                    order: 0,
                    group: {
                        order: 6,
                        questionnaire: {
                            type: questionnaireType_enum_1.QuestionnaireType.JawAssessment,
                        }
                    }
                }
            });
            console.log('essa é a próxima questão');
            console.log(nextQuestion);
            if (!nextQuestion) {
                throw httpResponses_1.HttpResponse.notFound({
                    message: 'Não foi encontrada a próxima questão para essa resposta',
                });
            }
            return {
                isTerminal: false,
                nextQuestionId: nextQuestion.id,
            };
        };
        this.stageZeroAlertsQuestionRule = (rulePayload) => {
            if (rulePayload.questionOptions.length > 0) {
                return {
                    isTerminal: true,
                    questionnaireResultType: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmSuspectionOnStageZero,
                };
            }
            return {
                isTerminal: true,
                questionnaireResultType: questionnaireResultType_enum_1.QuestionnaireResultType.OnmRmRisk,
            };
        };
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
    }
}
exports.JawAssessmentQuestionnaireRules = JawAssessmentQuestionnaireRules;
