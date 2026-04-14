import { QuestionnaireResponse } from './questionnaireResponse.entity';
import { Question } from './question.entity';
import { QuestionOption } from './questionOption.entity';
export declare class QuestionResponseAnswer {
    id: number;
    responseId: number;
    questionId: number;
    optionId: number | null;
    textAnswer: string | null;
    createdAt: Date;
    updatedAt: Date;
    response: QuestionnaireResponse;
    question: Question;
    option: QuestionOption | null;
}
