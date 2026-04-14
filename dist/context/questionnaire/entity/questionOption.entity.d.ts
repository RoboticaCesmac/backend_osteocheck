import { Question } from './question.entity';
import { QuestionResponseAnswer } from './questionnaireResponseAnswer.entity';
export declare class QuestionOption {
    id: number;
    questionId: number;
    text: string;
    value: string;
    order: number;
    isTerminal: boolean;
    nextQuestionId: number | null;
    createdAt: Date;
    question: Question;
    nextQuestion: Question | null;
    answers: QuestionResponseAnswer[];
}
