import { Request, Response } from 'express';
import { IPatientsService } from "./interface/patientsService.interface";

export class PatientsController {
  private patientsService: IPatientsService;
  constructor(patientsService: IPatientsService) {
    this.patientsService = patientsService
  }

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const patientId = Number(req.params.id);
      const { statusCode, ...response } = await this.patientsService.deleteById(patientId);
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { statusCode, ...response } = await this.patientsService.findAll();
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { identifier, dateOfBirth, gender, name } = req.body;
      const { statusCode, ...response } = await this.patientsService.create({
        professionalId,
        dateOfBirth,
        gender,
        name,
      })
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const patientId = Number(req.params.id);
      const { statusCode, ...response } = await this.patientsService.findById(patientId);
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }
}