import zod from 'zod';
import { Request } from "express";
import { CreatePatientDTO } from '../dto/createPatient.dto';
import { PatientsGender } from '../enum/patientsGender.enum';

class ProfessionalRequest {
  create(req: Request) {
    const signupSchema: zod.ZodType<Omit<CreatePatientDTO, 'professionalId'>> = zod.object({
      cpf: zod
        .string("É preciso informar o CPF")
        .transform((v) => v.replace(/\D/g, ""))
        .refine((v) => v.length === 11, {
          message: "CPF deve conter 11 dígitos",
        }),
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