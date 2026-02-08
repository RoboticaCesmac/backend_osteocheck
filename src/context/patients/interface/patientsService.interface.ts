import { ServiceResponse } from "../../../utils/serviceResponse";
import { CreatePatientDTO } from "../dto/createPatient.dto";
import { Patient } from "../entity/patients.entity";

export interface IPatientsService {
  create: (createPatientDTO: CreatePatientDTO) => Promise<ServiceResponse<Patient>>
}