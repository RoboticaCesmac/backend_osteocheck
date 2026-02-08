import { AppDataSource } from "../../database/dbConnection";
import { ProfessionalController } from "./professional.controller";
import { ProfessionalService } from './professional.service'
import { Professional } from "./entity/professional.entity";
import { Encrypt } from "../../commons/encrypt/encrypt";
import { JWTService } from "../../commons/jwt/jwt";

export function createProfessionalController() {
  const professionalService = createProfessionalService();
  return new ProfessionalController(professionalService);
}

export function createProfessionalService() {
  const jwtService = new JWTService();
  const encrypt = new Encrypt();
  const userRepository = AppDataSource.getRepository(Professional);
  return new ProfessionalService(userRepository, encrypt, jwtService);
}