import { QuestionnaireType } from "../enum/questionnaireType.enum";

export type QuestionnaireProgressDTO = {
    questionnaireType: QuestionnaireType;
    professionalId: number;
    patientId: number;
}

export type QuestionnaireProgressResponse = {
    isBeggining: boolean;
    questionnaireId?: number;
    questionId?: number;
    questionOptionsIds?: number[];
}
