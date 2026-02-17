import { Raw, Repository, In } from "typeorm";
import { Question } from "../entity/question.entity";
import { HttpResponse } from "../../../utils/httpResponses";
import { QuestionOption } from "../entity/questionOption.entity";
import { QuestionnaireRuleReturn } from "../type/questionnaireRuleReturn.type";
import { QuestionnaireResultType } from "../enum/questionnaireResultType.enum";
import { QuestionnaireType } from "../enum/questionnaireType.enum";
import { IQuestionnaireRules } from "../interface/questionnaireRules.interface";

type RuleRequiredPayload = {
  question: Question,
  questionOptions: QuestionOption[],
}

export class JawAssessmentQuestionnaireRules implements IQuestionnaireRules {
  private questionRepository: Repository<Question>;
  private questionOptionRepository: Repository<QuestionOption>;

  constructor(questionRepository: Repository<Question>, questionOptionRepository: Repository<QuestionOption>) {
    this.questionRepository = questionRepository
    this.questionOptionRepository = questionOptionRepository
  }

  orchestrateQuestionRule = async (questionId: number, questionOptionsIds: number[]): Promise<QuestionnaireRuleReturn | null> => {
    const question = await this.questionRepository.findOne(
      {
        relations: {
          group: true,
        },
        where: {
          id: questionId,
          group: {
            questionnaire: {
              type: QuestionnaireType.JawAssessment,
            }
          }
        },
      },
    );
    const questionOptions = await this.questionOptionRepository.find({
      where: {
        id: In(questionOptionsIds),
      },
    });
    if (!question) {
      throw HttpResponse.notFound({
        message: 'Essa questão não foi encontrada',
      });
    }
    if (question.group.order === 5 && question.order === 0) {
      return this.symptomsAndAlertsQuestionRule({
        question,
        questionOptions,
      });
    }
    if (question.group.order === 6 && question.order === 0) {
      return await this.diagnosisCriteriaQuestionRule({
        question,
        questionOptions,
      });
    }
    return this.terminalOptions(question, questionOptions);
  }

  private terminalOptions = (question: Question, questionOptions: QuestionOption[]): QuestionnaireRuleReturn | null => {
    if (question.group.order === 0  && question.order === 0 && questionOptions.find(qo => qo.isTerminal === true && qo.order === 1)) {
      return { isTerminal: true, questionnaireResultType: QuestionnaireResultType.OnmRmInsignificantRisk };
    }
    if (question.group.order === 3 && question.order === 0 && questionOptions.find(qo => qo.order === 0)) {
      return { isTerminal: true, questionnaireResultType: QuestionnaireResultType.OnmRmEstablished }
    }
    if (question.group.order === 6 && question.order === 0) {
      const finalResult = { isTerminal: true, questionnaireResultType: QuestionnaireResultType.StageThree };
      if (questionOptions.find(qo => qo.order === 0)) {
        finalResult.questionnaireResultType = QuestionnaireResultType.StageOne;
      }
      if (questionOptions.find(qo => qo.order === 1)) {
        finalResult.questionnaireResultType === QuestionnaireResultType.StageTwo;
      }
      return finalResult;
    } 
    return null;
  }

  private symptomsAndAlertsQuestionRule = (rulePayload: RuleRequiredPayload): QuestionnaireRuleReturn => {
    if (rulePayload.questionOptions.length > 1) {
      return {
        isTerminal: true,
        questionnaireResultType: QuestionnaireResultType.OnmRmSuspectionOnStageZero,
      }
    }
    return {
      isTerminal: true,
      questionnaireResultType: QuestionnaireResultType.OnmRmRisk,
    }
  };

  private diagnosisCriteriaQuestionRule = async (rulePayload: RuleRequiredPayload): Promise<QuestionnaireRuleReturn> => {
    if (rulePayload.questionOptions.length < 3) {
      return {
        isTerminal: true,
        questionnaireResultType: QuestionnaireResultType.OnmRmRisk,
      }
    }
    const nextQuestion = await this.questionRepository.findOne({
      where: {
        order: 0,
        group: {
          order: 6,
          questionnaire: {
            type: QuestionnaireType.JawAssessment,
          }
        }
      }
    })
    if (!nextQuestion) {
      throw HttpResponse.notFound({
        message: 'Não foi encontrada a próxima questão para essa resposta',
      });
    }
    return {
      isTerminal: false,
      nextQuestionId: nextQuestion.id,
    }
  }
}