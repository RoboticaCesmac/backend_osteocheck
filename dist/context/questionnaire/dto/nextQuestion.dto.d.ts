import { QuestionnaireType } from "../enum/questionnaireType.enum";
export type NextQuestionDTO = {
    questionnaireType: QuestionnaireType;
    professionalId: number;
    patientId: number;
    questionOptionsIds?: number[];
    questionId?: number;
};
