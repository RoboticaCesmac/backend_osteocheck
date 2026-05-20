import { PatientsGender } from "../enum/patientsGender.enum";

export type CreatePatientDTO = {
  professionalId: number;
  dateOfBirth: Date;
  name: string;
  gender: PatientsGender
}