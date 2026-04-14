import { Professional } from "../../professional/entity/professional.entity";
import { Patient } from "../../patients/entity/patients.entity";
export declare class ProfessionalPatients {
    id: number;
    professionalId: number;
    patientId: number;
    professional: Professional;
    patient: Patient;
}
