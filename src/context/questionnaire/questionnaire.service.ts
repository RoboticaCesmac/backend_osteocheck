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
    questionnaireResponseId = questionnaireResponse?.id ?? 0;
    if (questionnaireResponse && isFinalQuestion) {
      let questionnaireResultId: number | null = null;
      if (questionnaireResultType) {
        const questionnaireResult = await this.findQuestionnaireResultByType(questionnaireResultType);
        questionnaireResultId = questionnaireResult?.id ?? null;
      }
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
}