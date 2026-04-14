import { QuestionnaireResultType } from '../enum/questionnaireResultType.enum';
import { QuestionnaireResponse } from './questionnaireResponse.entity';
export declare class QuestionnaireResult {
    id: number;
    text: string;
    response: QuestionnaireResponse;
    type: QuestionnaireResultType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
