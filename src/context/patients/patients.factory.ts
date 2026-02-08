import { AppDataSource } from "../../database/dbConnection";
import { createProfessionalService } from "../professional/professional.factory";
import { ProfessionalPatients } from "../professionalPatients/entity/professionalPatients.entity";
import { Patient } from "./entity/patients.entity";
import { PatientsController } from "./patients.controller";
import { PatientsService } from "./patients.service";

export function createPatientsController() {
  const professionalService = createProfessionalService();
  const appDataSource = AppDataSource;
  const patientsRepository = AppDataSource.getRepository(Patient);
  const professionalPatientsRepository = AppDataSource.getRepository(ProfessionalPatients);
  const patientsService = new PatientsService(
    patientsRepository,
    professionalPatientsRepository,
    appDataSource,
    professionalService
  );
  return new PatientsController(patientsService);
}