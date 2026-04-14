import { Questionnaire } from './questionnaire.entity';
import { Question } from './question.entity';
export declare class QuestionGroup {
    id: string;
    questionnaireId: string;
    name: string;
    description: string;
    order: number;
    isInitial: boolean;
    createdAt: Date;
    updatedAt: Date;
    questionnaire: Questionnaire;
    questions: Question[];
}
