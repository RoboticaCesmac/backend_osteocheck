import zod from 'zod';
import { Request } from "express";
import { CreatePatientDTO } from '../dto/createPatient.dto';
import { PatientsGender } from '../enum/patientsGender.enum';

class ProfessionalRequest {
  create(req: Request) {
    const signupSchema: zod.ZodType<Omit<CreatePatientDTO, 'professionalId'>> = zod.object({
      dateOfBirth: zod
        .coerce.date(),
      gender: zod
        .enum(PatientsGender),
      name: zod
        .string("É preciso informar o nome")
        .min(2, "O nome precisa ter no mínimo 2 caracteres")
    });

    return signupSchema.safeDecode(req.body);
  };
}

export default new ProfessionalRequest();