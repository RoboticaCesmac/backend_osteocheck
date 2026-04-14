import { QuestionnaireResultType } from "../enum/questionnaireResultType.enum";
export type QuestionnaireRuleReturn = {
    isTerminal: boolean;
    nextQuestionId?: number;
    questionnaireResultType?: QuestionnaireResultType;
};
