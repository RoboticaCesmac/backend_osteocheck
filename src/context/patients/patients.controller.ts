import { Request, Response } from 'express';
import { IPatientsService } from "./interface/patientsService.interface";

export class PatientsController {
  private patientsService: IPatientsService;
  constructor(patientsService: IPatientsService) {
    this.patientsService = patientsService
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { cpf, dateOfBirth, gender, name } = req.body;
      const { statusCode, ...response } = await this.patientsService.create({
        professionalId,
        cpf,
        dateOfBirth,
        gender,
        name,
      })
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }
}