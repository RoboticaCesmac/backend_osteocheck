import { QuestionType } from '../enum/questionType.enum';
import { QuestionGroup } from './questionGroup.entity';
import { QuestionOption } from './questionOption.entity';
import { QuestionResponseAnswer } from './questionnaireResponseAnswer.entity';
export declare class Question {
    id: number;
    groupId: string;
    text: string;
    type: QuestionType;
    order: number;
    isRequired: boolean;
    helpText: string;
    createdAt: Date;
    updatedAt: Date;
    group: QuestionGroup;
    options: QuestionOption[];
    answers: QuestionResponseAnswer[];
}
