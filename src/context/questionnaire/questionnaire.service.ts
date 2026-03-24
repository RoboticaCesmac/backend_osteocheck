import { In, Relation, Repository } from "typeorm";
import { HttpResponse } from "../../utils/httpResponses";
import { serviceResponse, ServiceResponse } from "../../utils/serviceResponse";
import { IPatientsService } from "../patients/interface/patientsService.interface";
import { NextQuestionDTO } from "./dto/nextQuestion.dto";
import { QuestionnaireProgressDTO, QuestionnaireProgressResponse } from "./dto/questionnaireProgress.dto";
import { Question } from "./entity/question.entity";
import { IQuestionnaireService } from "./interface/questionnaireService.interface";
import { Questionnaire } from "./entity/questionnaire.entity";
import { QuestionnaireResponse } from "./entity/questionnaireResponse.entity";
import { ResponseStatus } from "./enum/responseStatus.enum";
import dayjs from "dayjs";
import { DataSource } from "typeorm";
import { QuestionResponseAnswer } from "./entity/questionnaireResponseAnswer.entity";
import { IQuestionnaireRules } from "./interface/questionnaireRules.interface";
import { QuestionnaireResultType } from "./enum/questionnaireResultType.enum";
import { QuestionnaireResult } from "./entity/questionnaireResult.entity";
import { QuestionnaireType } from "./enum/questionnaireType.enum";
import PDFDocument from 'pdfkit';
import { GeneratePdfDTO } from "./dto/generatePdf.dto";
import { Professional } from "../professional/entity/professional.entity";
export class QuestionnaireService implements IQuestionnaireService {
  private patientsService: IPatientsService;
  private questionnaireRepository: Repository<Questionnaire>;
  private questionRepository: Repository<Question>;
  private questionnaireResponseRepository: Repository<QuestionnaireResponse>;
  private dataSource: DataSource;
  private questionnaireRules: IQuestionnaireRules;
  private questionnaireResultRepository: Repository<QuestionnaireResult>;

  constructor(
    patientsService: IPatientsService,
    questionnaireRepository: Repository<Questionnaire>,
    questionRepository: Repository<Question>,
    questionnaireResponseRepository: Repository<QuestionnaireResponse>,
    dataSource: DataSource,
    questionnaireRules: IQuestionnaireRules,
    questionnaireResultRepository: Repository<QuestionnaireResult>,
  ) {
    this.patientsService = patientsService;
    this.questionnaireRepository = questionnaireRepository;
    this.questionRepository = questionRepository;
    this.questionnaireResponseRepository = questionnaireResponseRepository;
    this.dataSource = dataSource;
    this.questionnaireRules = questionnaireRules;
    this.questionnaireResultRepository = questionnaireResultRepository;
  }

  private handleFirstQuestion = async (nextQuestionDTO: NextQuestionDTO): Promise<ServiceResponse<Question | null>> => {
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
    return serviceResponse({
      data: question,
      statusCode: question ? 200 : 404,
    });
  }

  private handleOptionWithNextQuestionId = async (nexQuestionId: number, nextQuestionDTO: NextQuestionDTO): Promise<ServiceResponse<Question | null>> => {
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
    return serviceResponse({
      data: question,
      statusCode: question ? 200 : 404,
    });
  }

  private handleNextQuestionInOrder = async (nextQuestionDTO: NextQuestionDTO): Promise<ServiceResponse<Question | null>> => {
    const currentQuestion = await this.questionRepository.findOne({
      relations: {
        group: true,
      },
      where: {
        id: nextQuestionDTO.questionId,
      },
    });
    if (!currentQuestion) {
      throw HttpResponse.notFound({
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
            order: currentQuestion.order,
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
    return serviceResponse(HttpResponse.success({
      data: nextQuestion,
    }));
  }

  private findQuestionnaireResultByType = async (questionnaireResultType: QuestionnaireResultType): Promise<QuestionnaireResult | null> => {
    const questionnaireResult = await this.questionnaireResultRepository.findOne({
      where: {
        type: questionnaireResultType,
      },
    });
    return questionnaireResult;
  }

  private handleQuestionnaireResponseSession = async (nextQuestionDTO: NextQuestionDTO, isFinalQuestion?: boolean, questionnaireResultType?: QuestionnaireResultType) => {
    let questionnaireResponseId: number;
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
        status: ResponseStatus.IN_PROGRESS,
      }
    });

    let questionnaireResultId: number | null = null;
    if (questionnaireResultType) {
      const questionnaireResult = await this.findQuestionnaireResultByType(questionnaireResultType);
      questionnaireResultId = questionnaireResult?.id ?? null;
    }

    questionnaireResponseId = questionnaireResponse?.id ?? 0;
    if (questionnaireResponse && isFinalQuestion) {
      questionnaireResponse.completedAt = dayjs().toDate();
      questionnaireResponse.status = ResponseStatus.COMPLETED;
      questionnaireResponse.result = { id: questionnaireResultId } as Relation<QuestionnaireResult>;
      await this.questionnaireResponseRepository.save(questionnaireResponse);
    }

    if (!questionnaireResponse) {
      const questionnaire = await this.questionnaireRepository.findOne({
        where: {
          type: nextQuestionDTO.questionnaireType,
        },
      });

      const newQuestionnaireResponse = new QuestionnaireResponse();
      newQuestionnaireResponse.questionnaireId = questionnaire?.id ?? 1;
      newQuestionnaireResponse.professionalId = nextQuestionDTO.professionalId;
      newQuestionnaireResponse.patientId = nextQuestionDTO.patientId;
      newQuestionnaireResponse.status = isFinalQuestion ? ResponseStatus.COMPLETED : ResponseStatus.IN_PROGRESS;
      newQuestionnaireResponse.completedAt = isFinalQuestion ? dayjs().toDate() : null;
      newQuestionnaireResponse.result = { id: questionnaireResultId } as Relation<QuestionnaireResult>;
      const saveQuestionnaireResponseAnswer = await this.questionnaireResponseRepository.save(newQuestionnaireResponse);
      questionnaireResponseId = saveQuestionnaireResponseAnswer.id;
    }
    await this.answerQuestion({ ...nextQuestionDTO, questionnaireResponseId });
  }

  private answerQuestion = async (nextQuestionDTOWithQuestionnaireResponse: NextQuestionDTO & { questionnaireResponseId: number }) => {
    if (nextQuestionDTOWithQuestionnaireResponse.questionId) {
      const existingAnswers = await this.dataSource.getRepository(QuestionResponseAnswer).find({
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
      const questionResponseAnswerList: QuestionResponseAnswer[] = [];
      nextQuestionDTOWithQuestionnaireResponse.questionOptionsIds?.forEach(
        (questionOption) => {
          const questionResponseAnswer = new QuestionResponseAnswer();
          questionResponseAnswer.responseId = nextQuestionDTOWithQuestionnaireResponse.questionnaireResponseId;
          questionResponseAnswer.questionId = nextQuestionDTOWithQuestionnaireResponse.questionId!;
          questionResponseAnswer.optionId = questionOption;
          questionResponseAnswerList.push(questionResponseAnswer);
        }
      )
      await queryRunner.manager.save(QuestionResponseAnswer, questionResponseAnswerList);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return;
  }

  nextQuestion = async (nextQuestionDTO: NextQuestionDTO): Promise<ServiceResponse<Question | null>> => {
    if (nextQuestionDTO.questionId && nextQuestionDTO.questionOptionsIds) {
      const questionnaireSpecificRule = await this.questionnaireRules.orchestrateQuestionRule(nextQuestionDTO.questionId, nextQuestionDTO.questionOptionsIds)
      if (questionnaireSpecificRule) {
        if (questionnaireSpecificRule.isTerminal) {
          console.log(questionnaireSpecificRule);
          await this.handleQuestionnaireResponseSession(nextQuestionDTO, true, questionnaireSpecificRule.questionnaireResultType);
          return serviceResponse(HttpResponse.success({
            data: null,
            message: 'Questionário finalizado com sucesso!',
          }));
        }
      }
    }
    const patient = await this.patientsService.findById(nextQuestionDTO.patientId);
    if (!patient.data) {
      throw HttpResponse.notFound({
        message: 'O paciente especificado não existe.',
      });
    }
    const questionnaire = await this.findQuestionnaireByType(nextQuestionDTO.questionnaireType);
    if (!questionnaire.data) {
      throw HttpResponse.notFound({
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
          id: In(nextQuestionDTO.questionOptionsIds!),
        }
      }
    });
    const optionWithNextQuestionId = currentQuestionAndOption?.options.find(o => o.nextQuestionId !== null);
    if (optionWithNextQuestionId) {
      return await this.handleOptionWithNextQuestionId(optionWithNextQuestionId.nextQuestionId!, nextQuestionDTO);
    }

    return await this.handleNextQuestionInOrder(nextQuestionDTO);
  }

  findQuestionnaireById = async (questionnaireId: number): Promise<ServiceResponse<Questionnaire | null>> => {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: {
        id: questionnaireId,
      },
    });
    return serviceResponse({
      data: questionnaire,
      statusCode: questionnaire ? 200 : 404,
    });
  }

  findQuestionnaireByType = async (questionnaireType: QuestionnaireType): Promise<ServiceResponse<Questionnaire | null>> => {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: {
        type: questionnaireType,
      },
    });
    return serviceResponse({
      data: questionnaire,
      statusCode: questionnaire ? 200 : 404,
    });
  }

  getQuestionnaireProgress = async (questionnaireProgressDTO: QuestionnaireProgressDTO): Promise<ServiceResponse<QuestionnaireProgressResponse>> => {
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

    if (!questionnaireResponse || questionnaireResponse.status === ResponseStatus.COMPLETED) {
      return serviceResponse(HttpResponse.success({
        data: {
          isBeggining: true,
        }
      }));
    }

    const lastAnswer = await this.dataSource.getRepository(QuestionResponseAnswer).findOne({
      where: { responseId: questionnaireResponse.id },
      order: { createdAt: 'DESC' },
    });

    if (!lastAnswer) {
      return serviceResponse(HttpResponse.success({
        data: {
          isBeggining: true,
        }
      }));
    }

    const lastQuestionAnswers = await this.dataSource.getRepository(QuestionResponseAnswer).find({
      where: {
        responseId: questionnaireResponse.id,
        questionId: lastAnswer.questionId,
      }
    });

    const questionOptionsIds = lastQuestionAnswers
      .filter(a => a.optionId !== null)
      .map(a => a.optionId as number);

    return serviceResponse(HttpResponse.success({
      data: {
        isBeggining: false,
        questionnaireId: questionnaireResponse.questionnaireId,
        questionId: lastAnswer.questionId,
        questionOptionsIds,
      }
    }));
  }

  generatePdf = async (generatePdfDTO: GeneratePdfDTO): Promise<ServiceResponse<Buffer>> => {
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

    if (!questionnaireResponse || questionnaireResponse.status !== ResponseStatus.COMPLETED) {
      throw HttpResponse.badRequest({
        message: 'Não é possível visualizar o PDF desse questionário. Ainda não foi finalizado.',
      });
    }

    const professional = await this.dataSource.getRepository(Professional).findOne({
      where: { id: generatePdfDTO.professionalId }
    });

    if (!professional) {
      throw HttpResponse.notFound({
        message: 'Profissional não encontrado.',
      });
    }

    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

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
      doc.text(`Data de Nascimento: ${dayjs(questionnaireResponse.patient.dateOfBirth).format('DD/MM/YYYY')}`);
      doc.text(`Gênero: ${questionnaireResponse.patient.gender}`).moveDown(1.5);

      // QA
      doc.fontSize(14).text('Respostas do Questionário', { underline: true }).moveDown(0.5);

      const questionMap = new Map<number, { text: string; options: string[] }>();

      questionnaireResponse.answers.forEach(answer => {
        if (!questionMap.has(answer.questionId)) {
          questionMap.set(answer.questionId, {
            text: answer.question.text,
            options: []
          });
        }
        const qEntry = questionMap.get(answer.questionId)!;
        if (answer.option) {
          qEntry.options.push(answer.option.text);
        } else if (answer.textAnswer) {
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

    return serviceResponse(HttpResponse.success({
      data: pdfBuffer,
    }));
  }
}