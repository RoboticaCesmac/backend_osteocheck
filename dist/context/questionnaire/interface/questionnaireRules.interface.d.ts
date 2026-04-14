import { QuestionnaireRuleReturn } from "../type/questionnaireRuleReturn.type";
export interface IQuestionnaireRules {
    orchestrateQuestionRule: (questionId: number, questionOptionsIds: number[]) => Promise<QuestionnaireRuleReturn | null>;
}
