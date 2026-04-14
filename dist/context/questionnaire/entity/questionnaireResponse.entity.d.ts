import { ResponseStatus } from '../enum/responseStatus.enum';
import { Questionnaire } from './questionnaire.entity';
import { QuestionResponseAnswer } from './questionnaireResponseAnswer.entity';
import { QuestionnaireResult } from './questionnaireResult.entity';
import { Patient } from '../../patients/entity/patients.entity';
export declare class QuestionnaireResponse {
    id: number;
    questionnaireId: number;
    professionalId: number;
    patientId: number;
    status: ResponseStatus;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    questionnaire: Questionnaire;
    patient: Patient;
    result: QuestionnaireResult;
    answers: QuestionResponseAnswer[];
}
