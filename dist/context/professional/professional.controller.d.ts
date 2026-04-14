import { Request, Response } from 'express';
import { IProfessionalService } from './interface/professionalService.interface';
export declare class ProfessionalController {
    private professionalService;
    constructor(professionalService: IProfessionalService);
    changePassword: (req: Request, res: Response) => Promise<Response>;
    deleteProfessional: (req: Request, res: Response) => Promise<Response>;
    confirmForgotPasswordToken: (req: Request, res: Response) => Promise<Response>;
    sendForgotPasswordToken: (req: Request, res: Response) => Promise<Response>;
    getProfessionalPatients: (req: Request, res: Response) => Promise<Response>;
    getProfile: (req: Request, res: Response) => Promise<Response>;
    getLastQuestionnaireResponses: (req: Request, res: Response) => Promise<Response>;
    confirmSignupToken: (req: Request, res: Response) => Promise<Response>;
    login: (req: Request, res: Response) => Promise<Response>;
    signup: (req: Request, res: Response) => Promise<Response>;
    getAll: (req: Request, res: Response) => Promise<Response>;
}
