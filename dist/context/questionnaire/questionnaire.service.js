"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireService = void 0;
const typeorm_1 = require("typeorm");
const httpResponses_1 = require("../../utils/httpResponses");
const serviceResponse_1 = require("../../utils/serviceResponse");
const questionnaireResponse_entity_1 = require("./entity/questionnaireResponse.entity");
const responseStatus_enum_1 = require("./enum/responseStatus.enum");
const dayjs_1 = __importDefault(require("dayjs"));
const questionnaireResponseAnswer_entity_1 = require("./entity/questionnaireResponseAnswer.entity");
const pdfkit_1 = __importDefault(require("pdfkit"));
const professional_entity_1 = require("../professional/entity/professional.entity");
class QuestionnaireService {
    constructor(patientsService, questionnaireRepository, questionRepository, questionnaireResponseRepository, dataSource, questionnaireRules, questionnaireResultRepository) {
        this.handleFirstQuestion = async (nextQuestionDTO) => {
            const question = await this.questionRepository.findOne({
                relations: {
                    options: true,
                    group: true,
                },
                where: {
                    group: {
                        order: 0,
                        questionnaire: {
                            type: nextQuestionDTO.questionnaireType,
                        },
                    },
                    order: 0,
                },
            });
            return (0, serviceResponse_1.serviceResponse)({
                data: question,
                statusCode: question ? 200 : 404,
            });
        };
        this.handleOptionWithNextQuestionId = async (nexQuestionId, nextQuestionDTO) => {
            const question = await this.questionRepository.findOne({
                relations: {
                    options: true,
                    group: true,
                },
                where: {
                    id: nexQuestionId,
                },
            });
            this.handleQuestionnaireResponseSession(nextQuestionDTO);
            return (0, serviceResponse_1.serviceResponse)({
                data: question,
                statusCode: question ? 200 : 404,
            });
        };
        this.handleNextQuestionInOrder = async (nextQuestionDTO) => {
            const currentQuestion = await this.questionRepository.findOne({
                relations: {
                    group: true,
                },
                where: {
                    id: nextQuestionDTO.questionId,
                },
            });
            if (!currentQuestion) {
                throw httpResponses_1.HttpResponse.notFound({
                    message: 'Essa questão não existe',
                });
            }
            const currentQuestionGroup = currentQuestion.group;
            const nextQuestion = await this.questionRepository.findOne({
                relations: {
                    options: true,
                    group: true,
                },
                where: [
                    {
                        order: currentQuestion.order + 1,
                        group: {
                            order: currentQuestionGroup.order,
                        }
                    },
                    {
                        group: {
                            order: currentQuestionGroup.order + 1,
                        },
                        order: 0,
                    },
                ],
            });
            await this.handleQuestionnaireResponseSession(nextQuestionDTO);
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                data: nextQuestion,
            }));
        };
        this.findQuestionnaireResultByType = async (questionnaireResultType) => {
            const questionnaireResult = await this.questionnaireResultRepository.findOne({
                where: {
                    type: questionnaireResultType,
                },
            });
            return questionnaireResult;
        };
        this.handleQuestionnaireResponseSession = async (nextQuestionDTO, isFinalQuestion, questionnaireResultType) => {
            let questionnaireResponseId;
            const questionnaireResponse = await this.questionnaireResponseRepository.findOne({
                relations: {
                    questionnaire: true,
                },
                where: {
                    questionnaire: {
                        type: nextQuestionDTO.questionnaireType,
                    },
                    patientId: nextQuestionDTO.patientId,
                    professionalId: nextQuestionDTO.professionalId,
                    status: responseStatus_enum_1.ResponseStatus.IN_PROGRESS,
                }
            });
            let questionnaireResultId = null;
            if (questionnaireResultType) {
                const questionnaireResult = await this.findQuestionnaireResultByType(questionnaireResultType);
                questionnaireResultId = questionnaireResult?.id ?? null;
            }
            questionnaireResponseId = questionnaireResponse?.id ?? 0;
            if (questionnaireResponse && isFinalQuestion) {
                questionnaireResponse.completedAt = (0, dayjs_1.default)().toDate();
                questionnaireResponse.status = responseStatus_enum_1.ResponseStatus.COMPLETED;
                questionnaireResponse.result = { id: questionnaireResultId };
                await this.questionnaireResponseRepository.save(questionnaireResponse);
            }
            if (!questionnaireResponse) {
                const questionnaire = await this.questionnaireRepository.findOne({
                    where: {
                        type: nextQuestionDTO.questionnaireType,
                    },
                });
                const newQuestionnaireResponse = new questionnaireResponse_entity_1.QuestionnaireResponse();
                newQuestionnaireResponse.questionnaireId = questionnaire?.id ?? 1;
                newQuestionnaireResponse.professionalId = nextQuestionDTO.professionalId;
                newQuestionnaireResponse.patientId = nextQuestionDTO.patientId;
                newQuestionnaireResponse.status = isFinalQuestion ? responseStatus_enum_1.ResponseStatus.COMPLETED : responseStatus_enum_1.ResponseStatus.IN_PROGRESS;
                newQuestionnaireResponse.completedAt = isFinalQuestion ? (0, dayjs_1.default)().toDate() : null;
                newQuestionnaireResponse.result = { id: questionnaireResultId };
                const saveQuestionnaireResponseAnswer = await this.questionnaireResponseRepository.save(newQuestionnaireResponse);
                questionnaireResponseId = saveQuestionnaireResponseAnswer.id;
            }
            await this.answerQuestion({ ...nextQuestionDTO, questionnaireResponseId });
        };
        this.answerQuestion = async (nextQuestionDTOWithQuestionnaireResponse) => {
            if (nextQuestionDTOWithQuestionnaireResponse.questionId) {
                const existingAnswers = await this.dataSource.getRepository(questionnaireResponseAnswer_entity_1.QuestionResponseAnswer).find({
                    where: {
                        responseId: nextQuestionDTOWithQuestionnaireResponse.questionnaireResponseId,
                        questionId: nextQuestionDTOWithQuestionnaireResponse.questionId,
                    }
                });
                if (existingAnswers.length > 0) {
                    return;
                }
            }
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.startTransaction();
            try {
                const questionResponseAnswerList = [];
                nextQuestionDTOWithQuestionnaireResponse.questionOptionsIds?.forEach((questionOption) => {
                    const questionResponseAnswer = new questionnaireResponseAnswer_entity_1.QuestionResponseAnswer();
                    questionResponseAnswer.responseId = nextQuestionDTOWithQuestionnaireResponse.questionnaireResponseId;
                    questionResponseAnswer.questionId = nextQuestionDTOWithQuestionnaireResponse.questionId;
                    questionResponseAnswer.optionId = questionOption;
                    questionResponseAnswerList.push(questionResponseAnswer);
                });
                await queryRunner.manager.save(questionnaireResponseAnswer_entity_1.QuestionResponseAnswer, questionResponseAnswerList);
                await queryRunner.commitTransaction();
            }
            catch (err) {
                await queryRunner.rollbackTransaction();
                throw err;
            }
            finally {
                await queryRunner.release();
            }
            return;
        };
        this.nextQuestion = async (nextQuestionDTO) => {
            if (nextQuestionDTO.questionId && nextQuestionDTO.questionOptionsIds) {
                const questionnaireSpecificRule = await this.questionnaireRules.orchestrateQuestionRule(nextQuestionDTO.questionId, nextQuestionDTO.questionOptionsIds);
                if (questionnaireSpecificRule) {
                    if (questionnaireSpecificRule.isTerminal) {
                        await this.handleQuestionnaireResponseSession(nextQuestionDTO, true, questionnaireSpecificRule.questionnaireResultType);
                        return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                            data: null,
                            message: 'Questionário finalizado com sucesso!',
                        }));
                    }
                    if (questionnaireSpecificRule.nextQuestionId) {
                        return await this.handleOptionWithNextQuestionId(questionnaireSpecificRule.nextQuestionId, nextQuestionDTO);
                    }
                }
            }
            const patient = await this.patientsService.findById(nextQuestionDTO.patientId);
            if (!patient.data) {
                throw httpResponses_1.HttpResponse.notFound({
                    message: 'O paciente especificado não existe.',
                });
            }
            const questionnaire = await this.findQuestionnaireByType(nextQuestionDTO.questionnaireType);
            if (!questionnaire.data) {
                throw httpResponses_1.HttpResponse.notFound({
                    message: 'O questionário especificado não existe.',
                });
            }
            if (!nextQuestionDTO.questionId) {
                return await this.handleFirstQuestion(nextQuestionDTO);
            }
            const currentQuestionAndOption = await this.questionRepository.findOne({
                relations: {
                    options: true,
                },
                where: {
                    id: nextQuestionDTO.questionId,
                    options: {
                        id: (0, typeorm_1.In)(nextQuestionDTO.questionOptionsIds),
                    }
                }
            });
            const optionWithNextQuestionId = currentQuestionAndOption?.options.find(o => o.nextQuestionId !== null);
            if (optionWithNextQuestionId) {
                return await this.handleOptionWithNextQuestionId(optionWithNextQuestionId.nextQuestionId, nextQuestionDTO);
            }
            return await this.handleNextQuestionInOrder(nextQuestionDTO);
        };
        this.findQuestionnaireById = async (questionnaireId) => {
            const questionnaire = await this.questionnaireRepository.findOne({
                where: {
                    id: questionnaireId,
                },
            });
            return (0, serviceResponse_1.serviceResponse)({
                data: questionnaire,
                statusCode: questionnaire ? 200 : 404,
            });
        };
        this.findQuestionnaireByType = async (questionnaireType) => {
            const questionnaire = await this.questionnaireRepository.findOne({
                where: {
                    type: questionnaireType,
                },
            });
            return (0, serviceResponse_1.serviceResponse)({
                data: questionnaire,
                statusCode: questionnaire ? 200 : 404,
            });
        };
        this.getQuestionnaireProgress = async (questionnaireProgressDTO) => {
            const questionnaireResponse = await this.questionnaireResponseRepository.findOne({
                where: {
                    questionnaire: {
                        type: questionnaireProgressDTO.questionnaireType,
                    },
                    patientId: questionnaireProgressDTO.patientId,
                    professionalId: questionnaireProgressDTO.professionalId,
                },
                order: {
                    createdAt: 'DESC',
                },
            });
            if (!questionnaireResponse || questionnaireResponse.status === responseStatus_enum_1.ResponseStatus.COMPLETED) {
                return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                    data: {
                        isBeggining: true,
                    }
                }));
            }
            const lastAnswer = await this.dataSource.getRepository(questionnaireResponseAnswer_entity_1.QuestionResponseAnswer).findOne({
                where: { responseId: questionnaireResponse.id },
                order: { createdAt: 'DESC' },
            });
            if (!lastAnswer) {
                return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                    data: {
                        isBeggining: true,
                    }
                }));
            }
            const lastQuestionAnswers = await this.dataSource.getRepository(questionnaireResponseAnswer_entity_1.QuestionResponseAnswer).find({
                where: {
                    responseId: questionnaireResponse.id,
                    questionId: lastAnswer.questionId,
                }
            });
            const questionOptionsIds = lastQuestionAnswers
                .filter(a => a.optionId !== null)
                .map(a => a.optionId);
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                data: {
                    isBeggining: false,
                    questionnaireId: questionnaireResponse.questionnaireId,
                    questionId: lastAnswer.questionId,
                    questionOptionsIds,
                }
            }));
        };
        this.generatePdf = async (generatePdfDTO) => {
            const questionnaireResponse = await this.questionnaireResponseRepository.findOne({
                relations: {
                    patient: true,
                    answers: {
                        question: true,
                        option: true,
                    },
                    result: true,
                },
                where: {
                    id: generatePdfDTO.id,
                },
                order: {
                    answers: {
                        createdAt: 'ASC',
                    },
                },
            });
            if (!questionnaireResponse || questionnaireResponse.status !== responseStatus_enum_1.ResponseStatus.COMPLETED) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Não é possível visualizar o PDF desse questionário. Ainda não foi finalizado.',
                });
            }
            const professional = await this.dataSource.getRepository(professional_entity_1.Professional).findOne({
                where: { id: generatePdfDTO.professionalId }
            });
            if (!professional) {
                throw httpResponses_1.HttpResponse.notFound({
                    message: 'Profissional não encontrado.',
                });
            }
            const pdfBuffer = await new Promise((resolve, reject) => {
                const doc = new pdfkit_1.default({ margin: 50 });
                const buffers = [];
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => {
                    const pdfData = Buffer.concat(buffers);
                    resolve(pdfData);
                });
                doc.on('error', reject);
                // Title
                doc.fontSize(20).text('Relatório de Questionário', { align: 'center' }).moveDown(1.5);
                // Professional Info
                doc.fontSize(14).text('Informações do Profissional', { underline: true }).moveDown(0.5);
                doc.fontSize(12).text(`Nome: ${professional.name}`);
                doc.text(`E-mail: ${professional.email}`).moveDown(1);
                // Patient Info
                doc.fontSize(14).text('Informações do Paciente', { underline: true }).moveDown(0.5);
                doc.fontSize(12).text(`Nome: ${questionnaireResponse.patient.name}`);
                doc.text(`CPF: ${questionnaireResponse.patient.cpf}`);
                doc.text(`Data de Nascimento: ${(0, dayjs_1.default)(questionnaireResponse.patient.dateOfBirth).format('DD/MM/YYYY')}`);
                doc.text(`Gênero: ${questionnaireResponse.patient.gender}`).moveDown(1.5);
                // QA
                doc.fontSize(14).text('Respostas do Questionário', { underline: true }).moveDown(0.5);
                const questionMap = new Map();
                questionnaireResponse.answers.forEach(answer => {
                    if (!questionMap.has(answer.questionId)) {
                        questionMap.set(answer.questionId, {
                            text: answer.question.text,
                            options: []
                        });
                    }
                    const qEntry = questionMap.get(answer.questionId);
                    if (answer.option) {
                        qEntry.options.push(answer.option.text);
                    }
                    else if (answer.textAnswer) {
                        qEntry.options.push(answer.textAnswer);
                    }
                });
                Array.from(questionMap.values()).forEach((qEntry, index) => {
                    doc.fontSize(12).font('Helvetica-Bold').text(`${index + 1}. ${qEntry.text}`);
                    doc.font('Helvetica').text(`Resposta(s): ${qEntry.options.join(', ')}`).moveDown(0.8);
                });
                if (questionnaireResponse.result && questionnaireResponse.result.text) {
                    doc.moveDown(1);
                    doc.fontSize(14).font('Helvetica-Bold').text('Diagnóstico do Questionário', { underline: true }).moveDown(1);
                    const cleanText = questionnaireResponse.result.text
                        .replace(/\*\*(.*?)\*\*/g, '$1')
                        .replace(/\*(.*?)\*/g, '$1')
                        .replace(/__(.*?)__/g, '$1')
                        .replace(/_(.*?)_/g, '$1')
                        .replace(/^#+\s+/gm, '')
                        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
                    doc.fontSize(12).font('Helvetica').text(cleanText);
                }
                doc.moveDown(2);
                doc.fontSize(14).font('Helvetica-Bold').text('Considerações Finais', { underline: true }).moveDown(1);
                doc.fontSize(12).font('Helvetica').text('Disclaimer: O aplicativo é uma ferramenta de apoio e NÃO substitui o julgamento clínico. O diagnóstico e tratamento finais são de responsabilidade do profissional de saúde.');
                doc.moveDown(0.5);
                doc.text('Atualizações: O conteúdo será revisado periodicamente para incorporar novas diretrizes e consensos.');
                doc.end();
            });
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                data: pdfBuffer,
            }));
        };
        this.patientsService = patientsService;
        this.questionnaireRepository = questionnaireRepository;
        this.questionRepository = questionRepository;
        this.questionnaireResponseRepository = questionnaireResponseRepository;
        this.dataSource = dataSource;
        this.questionnaireRules = questionnaireRules;
        this.questionnaireResultRepository = questionnaireResultRepository;
    }
}
exports.QuestionnaireService = QuestionnaireService;
