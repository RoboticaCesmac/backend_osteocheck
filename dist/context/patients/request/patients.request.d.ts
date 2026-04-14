import zod from 'zod';
import { Request } from "express";
import { CreatePatientDTO } from '../dto/createPatient.dto';
declare class ProfessionalRequest {
    create(req: Request): zod.ZodSafeParseResult<Omit<CreatePatientDTO, "professionalId">>;
}
declare const _default: ProfessionalRequest;
export default _default;
