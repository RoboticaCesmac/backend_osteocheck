import { PatientsGender } from "../enum/patientsGender.enum";
export type CreatePatientDTO = {
    professionalId: number;
    cpf: string;
    dateOfBirth: Date;
    name: string;
    gender: PatientsGender;
};
