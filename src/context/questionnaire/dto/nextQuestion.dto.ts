export type NextQuestionDTO = {
  questionnaireId: number;
  professionalId: number;
  patientId: number;
  questionOptionsIds?: number[];
  questionId?: number;
}