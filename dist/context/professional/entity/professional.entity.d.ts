import { Patient } from "../../patients/entity/patients.entity";
import { QuestionnaireResponse } from "../../questionnaire/entity/questionnaireResponse.entity";
export declare class Professional {
    id: number;
    name: string;
    email: string;
    password: string;
    accountConfirmationToken: string;
    forgotPasswordToken?: string;
    hasConfirmedAccount: boolean;
    patients: Patient[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    deactivated: boolean;
    questionnaireResponses: QuestionnaireResponse[];
}
