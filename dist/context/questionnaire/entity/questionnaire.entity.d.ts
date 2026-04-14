import { QuestionGroup } from './questionGroup.entity';
import { QuestionnaireResponse } from './questionnaireResponse.entity';
import { QuestionnaireType } from '../enum/questionnaireType.enum';
export declare class Questionnaire {
    id: number;
    title: string;
    description: string;
    isActive: boolean;
    type: QuestionnaireType;
    createdAt: Date;
    updatedAt: Date;
    groups: QuestionGroup[];
    responses: QuestionnaireResponse[];
}
