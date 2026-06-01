import { Request, Response } from 'express';
import { IPatientsService } from "./interface/patientsService.interface";
export declare class PatientsController {
    private patientsService;
    constructor(patientsService: IPatientsService);
    deleteById: (req: Request, res: Response) => Promise<Response>;
    getAll: (req: Request, res: Response) => Promise<Response>;
    create: (req: Request, res: Response) => Promise<Response>;
    getById: (req: Request, res: Response) => Promise<Response>;
}
