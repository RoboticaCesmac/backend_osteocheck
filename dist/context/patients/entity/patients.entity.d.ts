import { PatientsGender } from "../enum/patientsGender.enum";
import { ProfessionalPatients } from "../../professionalPatients/entity/professionalPatients.entity";
import { QuestionnaireResponse } from "../../questionnaire/entity/questionnaireResponse.entity";
export declare class Patient {
    id: number;
    name: string;
    cpf: string;
    dateOfBirth: Date;
    gender: PatientsGender;
    professionalRelations: ProfessionalPatients[];
    questionnaireResponses: QuestionnaireResponse[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
