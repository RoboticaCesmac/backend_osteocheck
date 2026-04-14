import { Repository } from "typeorm";
import { Question } from "../entity/question.entity";
import { QuestionOption } from "../entity/questionOption.entity";
import { QuestionnaireRuleReturn } from "../type/questionnaireRuleReturn.type";
import { IQuestionnaireRules } from "../interface/questionnaireRules.interface";
export declare class JawAssessmentQuestionnaireRules implements IQuestionnaireRules {
    private questionRepository;
    private questionOptionRepository;
    constructor(questionRepository: Repository<Question>, questionOptionRepository: Repository<QuestionOption>);
    orchestrateQuestionRule: (questionId: number, questionOptionsIds: number[]) => Promise<QuestionnaireRuleReturn | null>;
    private terminalOptions;
    private symptomsAndAlertsQuestionRule;
    private diagnosisCriteriaQuestionRule;
    private stageZeroAlertsQuestionRule;
}
